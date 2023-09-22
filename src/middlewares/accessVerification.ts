import { NextFunction, Request, Response } from 'express';

class verify_access {
    async verifyAdmin(req: Request, res: Response, next: NextFunction) {
        const role = req.headers.role;
        console.log("role is ",role)
        if (role == "ADMIN")
            next();
        else
            res.send("Access Denied")
    }

    async verifyUser(req: Request, res: Response, next: NextFunction) {
        const role = req.headers.role;
        console.log("role is ",role)
        if (role == "USER")
            next();
        else
            res.send("Access Denied")
    }
}

export const accessVerification = new verify_access();