import { Request, Response } from 'express';
import { TaxiServices } from '../../services/taxi.services';

export class agent_taxi_controller {
    async addTaxi(req: Request, res: Response) {
        const payload = req.body;
        try {
            await TaxiServices.addTaxi(payload);
            res.send("Taxi added")
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getAllTaxi(req: Request, res: Response) {
        try {
            const taxis = await TaxiServices.getAllTaxis();
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
            const id = req.query.id
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