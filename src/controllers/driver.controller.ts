import { Request, Response } from 'express';
import { driverServices } from '../services/driver.services';
import { Driver } from '../database/models/driver.model';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';

export class driver_controller {
    async addDriver(req: Request, res: Response) {
        try {
            const payload: Driver = req.body
            const driver = await driverServices.addDriver(payload)
            res.send({ Message: "Driver Added Succesfully", Data: driver })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    static async getAllDriversGRPC(req: ServerUnaryCall<any, any>, res: sendUnaryData<any>) {
        try {
            const drivers = await driverServices.getAllDrivers()
            console.log("dds",drivers)
            res(null, { drivers })
        }
        catch (e) {
            console.log(e);
            res(null, { "Error: ": e.message });
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

    // async getAvailableDrivers(req: Request, res: Response) {
    //     try {
    //         const userClient = new UserServiceClient('localhost:50052', grpc.credentials.createInsecure());
    //         const request = new GetAvailableDriversRequest();
    //         userClient.getAllDrivers(request, (error, response: GetAvailableDriversResponse) => {
    //             if (error) {
    //                 console.error(error);
    //                 res.status(500).send({ "Error": error.message });
    //             } else {
    //                 const drivers = response.getDriversList();
    //                 res.send({ Drivers: drivers });
    //             }
    //         });
    //     }
    //     catch (e) {
    //         console.error(e);
    //         res.status(500).send({ "Error: ": e.message });
    //     }
    // }
    async removeDriver(req: Request, res: Response) {
        try {
            const id: string = req.query.id as string
            await driverServices.removeDriver(id)
            res.send({ Message: "Driver Removed!" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async toggleAvailability(req: Request, res: Response) {
        try {
            const driver_id: string = req.query.id as string
            const driver = await driverServices.toggleDriverStatus(driver_id)
            res.send({ Message: `Avaiability set to ${driver.avaiable}` })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
}