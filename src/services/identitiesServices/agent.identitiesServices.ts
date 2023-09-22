import { AgentE } from "../../entities/agent.entity";
import bcrypt from 'bcrypt'
import { generateToken } from "../../middlewares/jwt";
import { redis } from "../../database/redis";
import { loginPayload, signupPayload, signupVerification } from "../../interface/controllers/auth";
import { autoGenerator } from "../../utils/autoGenerator";
import { emailSender } from "../../utils/nodemailer";



class agent_auth_services {
    async requestSignup(payload: signupPayload) {
        let user = await AgentE.getUser({ email: payload.email })
        if (user)
            throw new Error("User already associated with following email")
        let phone = await AgentE.getUser({ phone: payload.phone })
        if (phone)
            throw new Error("User already associated with following phone number")

        const salt = 10;
        const hashpassword = await bcrypt.hash(payload.password, salt)
        payload.password = hashpassword

        const otp = await autoGenerator.otpGenerator(`${payload.email}_create_otp`, 120)
        await emailSender.sendEmail(payload.email, "Email verification", `Hello ${payload.first_name},Please verify your email with this OTP: ${otp}. Code will expire in 2 minutes.`)

        await redis.set(`${payload.email}_create`, JSON.stringify(payload), 300)
        return
    }

    async verifyEmailandSignup(payload: signupVerification) {
        const redis_payload = await redis.get(`${payload.email}_create`)
        if (!redis_payload)
            throw new Error("Your session has expired. Please Signup again.")
        const redis_otp = await redis.get(`${payload.email}_create_otp`)
        if (payload.otp != redis_otp)
            throw new Error("Invalid OTP")
        const payload_data = JSON.parse(redis_payload)
        return await AgentE.create(payload_data)

    }

    async login(payload: loginPayload) {
        console.log(payload)
        let user = await AgentE.getUser({ email: payload.email })
        console.log(user)
        if (!user)
            throw new Error("Invalid Email!")
        const isValid = await bcrypt.compare(payload.password, user.password);
        
        if (!isValid)
            throw new Error("Invalid Password")
        const token = generateToken({ id: user._id, role:"AGENT" });
        return token
    }

    async forgotPassword(payload) {
       
        if (await this.isBlocked(payload.email))
            throw new Error("You have requested for OTP too many times. Please try again later.")
        const ttl = await redis.ttl(`${payload.email}_fgtpwd`)
        if (ttl > 1)
            throw new Error(`You can only request after ${ttl} seconds.`)
        const otp = await autoGenerator.otpGenerator(`${payload.email}_fgtpwd`, 120)
        await emailSender.sendEmail(payload.email, "OTP for password reset", `Hello ${payload.first_name}, Your OTP for password reset is ${otp}. Code will expire in 2 minutes.`)
        await this.increaseAttempts(payload.email)
        return 
    }

    async updatePassword(payload)
    {
        const stored_otp = redis.get(`${payload.email}_fgtpwd`);
        if(payload.otp != stored_otp )
            throw new Error("Invalid OTP")
        
    }

    async increaseAttempts(email: string) {
        const attempts = await parseInt(await redis.get(`${email}_attempts`)) || 0
        await redis.set(`${email}_attempts`, (attempts + 1).toString(), 1800)
    }

    async isBlocked(email: string) {
        const attempts = await parseInt(await redis.get(`${email}_attempts`)) || 0
        if (attempts >= 3)
            return true
    }
}

export const agentAuthServices = new agent_auth_services();
