import { Request, Response } from 'express';
import { TaxiServices } from '../services/taxi.services';

export class taxi_controller {
    async addTaxi(req: Request, res: Response) {
        const payload = req.body;
        const payload_category: string = req.body.category
        payload.category = payload_category.toUpperCase();
        try {
            await TaxiServices.addTaxi(payload);
            res.send({ Message: "Taxi added" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async updateTaxiDetails(req: Request, res: Response) {
        const id = req.body.id;
        const payload = req.body.update;
        const payload_category: string = payload.category
        if (payload_category)
            payload.category = payload_category.toUpperCase();
        try {
            await TaxiServices.updateTaxiDetails(id, payload);
            res.send({ Message: "Taxi updated" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }


    async getAllTaxi(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);

            console.log("")
            const skip = (page - 1) * limit;
            const itemsPerPage = limit*1;

            const pagination = {
                limit : itemsPerPage,
                skip : skip
            }

            const taxis = await TaxiServices.getAllTaxis(pagination);
            if(taxis.length == 0)
                throw new Error("No Data")
            res.send({ Taxis: taxis })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getAvailableTaxi(req: Request, res: Response) {
        try {
            const taxis = await TaxiServices.getAvailableTaxis();
            res.send({ Taxis: taxis })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getTaxiById(req: Request, res: Response) {
        try {
            const id = req.query.id as string
            const taxi = await TaxiServices.getTaxiById(id);
            res.send({ Taxi: taxi })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async toggleTaxiStatus(req: Request, res: Response) {
        try {
            const payload = req.body
            const taxi = await TaxiServices.toggleTaxiStatus(payload.id);
            res.send({ Taxi: taxi })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
}