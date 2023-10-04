import { Driver } from "../database/models/driver.model"
import { DriverE } from "../entities/driver.entity"
import { autoGenerator } from "../utils/autoGenerator"
import { emailSender } from "../utils/nodemailer"


class driver_services {
    async addDriver(payload:Driver) {
        if (await this.getDriver({ email: payload.email }) || await this.getDriver({ phone: payload.phone }))
            throw new Error("Driver already exists")
        payload.password = await autoGenerator.passwordGenerator()
        const driver = await DriverE.addDriver(payload)
        await this.notifyDriver(driver)
        return driver
    }

    async notifyDriver(driver) {
        const email = driver.email
        const subject = "Welcome to Travel Agency"
        const body = `
        Hello ${driver.name},
        Welcome to travel agency.You have been successfully added to our company by an agent.
        
        Please use the following credentials to login:

        Email : ${driver.email}
        Password : ${driver.password}
        
        Kindly change the password after you login.
        Thank You`
        await emailSender.sendEmail(email, subject, body)
    }

    async getAllDrivers() {
        const drivers = await DriverE.getAllDrivers()
        return drivers
    }

    async getDriver(condition) {
        const driver = await DriverE.getDriver(condition)
        return driver
    }

    async getDriverById(id: string) {
        const condition = { _id: id }
        const drivers = await DriverE.getDriver(condition)
        return drivers
    }

    async removeDriver(id: string) {
        if (!(await this.getDriverById(id)))
            throw new Error("Driver not found")
        const driver = await DriverE.removeDriver(id)
        return driver
    }

    async getAvailableDrivers() {
        return await this.getDriver({ avaiable: true })
    }

    async toggleDriverStatus(id:string)
    {
        const driver = await this.getDriverById(id);
        const new_status = !driver.available
        console.log(new_status)
        return await DriverE.updateDriver({_id:id},{available:new_status})
    }
}

export const driverServices = new driver_services();