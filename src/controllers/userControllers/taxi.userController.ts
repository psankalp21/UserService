import { Request, Response } from 'express';
import { TaxiServices } from '../../services/taxi.services';

export class user_taxi_controller {
    async getAllTaxis(req: Request, res: Response) {
        try {
            const taxis = await TaxiServices.getAllTaxis()
            res.send({ taxis: taxis })
        }
        catch (e) {
            res.send({ "Error": e })
        }
    }

    async getTaxiById(req: Request, res: Response) {
        try {
            const taxi_id = req.query.taxi_id
            const taxis = await TaxiServices.getTaxiById(taxi_id)
            res.send({ taxis: taxis })
        }
        catch (e) {
            res.send({ "Error": e })
        }
    }
    
    
}