import { Request, Response } from 'express';
import { forgotPassword, loginPayload, signupPayload, signupVerification } from '../../interface/controllers/identities';
import { agentAuthServices } from '../../services/identitiesServices/agent.identitiesServices';

export class agent_auth_controller {
    async requestSignup(req: Request, res: Response) {
        const payload: signupPayload = req.body ;
        try {
            const user = await agentAuthServices.requestSignup(payload);
            res.send("Please verify your email to complete signup.")
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async verifyEmailandSignup(req: Request, res: Response) {
        const payload : signupVerification= req.body ;
        try {
            const user = await agentAuthServices.verifyEmailandSignup(payload);
            res.send("Signup Success!")
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async login(req: Request, res: Response) {
        console.log("user login hit")
        const payload :loginPayload = req.body;
        try {
            const user = await agentAuthServices.login(payload);
            res.send({
                "Message": "Login Success!",
                "Token": user
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
            const user = await agentAuthServices.forgotPassword(payload);
            res.send({ "Message": user })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
}





