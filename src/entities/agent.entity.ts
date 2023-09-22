import AgentCollection from "../database/models/agent.model";
import BaseEntity from "./base.entity";

class AgentEntity extends BaseEntity {
    constructor() {
        super(AgentCollection);
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

export const AgentE = new AgentEntity();


