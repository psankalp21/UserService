import TaxiCollection from "../database/models/taxi.model";
import BaseEntity from "./base.entity";

class TaxiEntity extends BaseEntity {
    constructor() {
        super(TaxiCollection);
    }

    async addTaxi(payload) {
        return await this.create(payload)
    }

    async getTaxi(condition){
        return await this.findOne(condition)
    }

    async getAllTaxis(condition?){
        return await this.find(condition)
    }

    async updateTaxi(condition,payload)
    {
        return await this.updateOne(condition,payload)
    }

}

export const TaxiE = new TaxiEntity();


