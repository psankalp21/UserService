import UserCollection from "../database/models/users.model";
import BaseEntity from "./base.entity";

class UserEntity extends BaseEntity {
    constructor() {
        super(UserCollection);
    }

    async signup(payload) {
        return await this.create(payload)
    }

    async getUser(condition){
        return await this.findOne(condition)
    }

    async login(email) {
        let condition = { email: email }
        let data = await this.findOne(condition)
        return data;
    }

}

export const UserE = new UserEntity();


