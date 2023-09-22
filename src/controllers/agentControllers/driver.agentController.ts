import { Request, Response } from 'express';
import { driverServices } from '../../services/driver.services';

export class agent_driver_controller {
    async addDriver(req: Request, res: Response) {
        try {
            const payload = req.body
            const driver = await driverServices.addDriver(payload)
            res.send({ Message: "Driver Added Succesfully", Data: driver })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getAllDrivers(req: Request, res: Response) {
        try {
            const drivers = await driverServices.getAllDrivers()
            res.send({ Drivers: drivers })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getAvailableDrivers(req: Request, res: Response) {
        try {
            const drivers = await driverServices.getAllDrivers()
            res.send({ Drivers: drivers })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async removeDriver(req: Request, res: Response) {
        try {
            const id = req.query.id
            await driverServices.removeDriver(id)
            res.send({ Message: "Driver Removed!" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
}