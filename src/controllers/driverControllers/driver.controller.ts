import { Request, Response } from 'express';
import { driverServices } from '../../services/driver.services';

export class driver_controller {
    async toggleAvailability(req: Request, res: Response) {
        try {
            const driver_id = req.headers.id
            const driver = await driverServices.toggleDriverStatus(driver_id)
            res.send({ Message: `Avaiability set to ${driver.avaiable}` })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

}