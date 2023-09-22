import DriverCollection from "../database/models/driver.model";
import BaseEntity from "./base.entity";

class DriverEntity extends BaseEntity {
    constructor() {
        super(DriverCollection);
    }

    async addDriver(payload) {
        return await this.create(payload)
    }

    async updateDriverPassword(payload)
    {
        const condition = {_id:payload.id}
        const update = { password : payload.new_password}
        return await this.updateOne(condition,update)
    }
    
    async getDriver(condition) {
        return await this.findOne(condition)
    }

    async getAllDrivers() {
        return await this.find()
    }

    async removeDriver(id:string)
    {
        return await this.findByIdAndRemove(id)
    }

    async updateDriver(condition,update)
    {
        return await this.updateOne(condition,update)
    }

}

export const DriverE = new DriverEntity();


