import { Request, Response } from 'express';
import { forgotPassword, loginPayload, passwordReset } from '../../interface/controllers/identities';
import { driverAuthServices } from '../../services/identitiesServices/driver.identitiesServices';

export class driver_auth_controller {

    async login(req: Request, res: Response) {
        const payload :loginPayload = req.body ;
        try {
            const driver = await driverAuthServices.login(payload);
            res.send({
                "Message": "Login Success!",
                "Token": driver
            })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async forgotPassword(req: Request, res: Response) {

        const payload:forgotPassword = req.body;
        try {
            const user = await driverAuthServices.forgotPassword(payload);
            res.send({ "Message": user })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async passwordReset(req: Request, res: Response) {

        const payload:passwordReset = req.body;
        try {
            const user = await driverAuthServices.passwordReset(payload);
            res.send({ "Message": "Password Updated" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    
}