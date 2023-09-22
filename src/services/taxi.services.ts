import { TaxiE } from "../entities/taxi.entity"

class taxi_services {
    async addTaxi(payload) {
        let taxi = await TaxiE.getTaxi({ number: payload.number })
        if (taxi)
            throw new Error("Taxi already exists")
        await TaxiE.create(payload)
    }

    async getAllTaxis() {
        let taxi = await TaxiE.getAllTaxis()
        return taxi
    }

    async getAvailableTaxis()
    {
        let condition = {available:true}
        let taxi = await TaxiE.getTaxi(condition)
        return taxi
    }

    async getTaxiById(id:string) {
        let condition = {_id:id}
        let taxi = await TaxiE.getTaxi(condition)
        return taxi
    }

    async toggleTaxiStatus(id:string)
    {
        const taxi = await this.getTaxiById(id);
        const new_status = !taxi.available
        console.log(new_status)
        return await TaxiE.updateTaxi({_id:id},{available:new_status})
    }

  
}

export const TaxiServices = new taxi_services();
