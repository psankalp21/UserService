import { redis } from "../database/redis";

class Autogenerator {
    async otpGenerator(key: string, exp: number) {
        const length = 6
        const characters = '0123456789';
        let otp = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            otp += characters[randomIndex];
        }
        await redis.set(key, otp, exp)
        return otp
    }

    async passwordGenerator() {
        const length = 8
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password
    }
}


export const autoGenerator = new Autogenerator()