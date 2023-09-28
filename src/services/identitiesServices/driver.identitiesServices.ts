import bcrypt from 'bcrypt'
import { generateToken } from "../../middlewares/jwt";
import { redis } from "../../database/redis";
import { loginPayload } from "../../interface/controllers/auth";
import { DriverE } from "../../entities/driver.entity";
import { autoGenerator } from "../../utils/autoGenerator";
import { emailSender } from "../../utils/nodemailer";
import { error } from 'console';

class driver_auth_services {
    async login(payload: loginPayload) {
        console.log(payload)
        let driver = await DriverE.getDriver({ email: payload.email })
        if (!driver)
            throw new Error("Invalid Email!")
        const isValid = await bcrypt.compare(payload.password, driver.password);
        if (!isValid)
            throw new Error("Invalid Password")
        const token = generateToken({ id: driver._id, role: "DRIVER" });
        return token
    }

    async setNewPassowrd(payload) {
        const isValid = await bcrypt.compare(payload.old_password, payload.password);
        if (!isValid)
            throw new error("Invalid password")
        const driver = await DriverE.updateDriverPassword(payload)
        return driver
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

    async passwordReset(payload) {
        const stored_otp = redis.get(`${payload.email}_fgtpwd`);
        if (payload.otp != stored_otp)
            throw new Error("Invalid OTP")
        const salt = 10;
        payload.password = bcrypt.hash(payload.password, salt)
        await DriverE.updateDriverPassword(payload)
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


export const driverAuthServices = new driver_auth_services();