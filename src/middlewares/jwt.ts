import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from '../common/appconfig';

const SECRETKEY = appConfig.env.SECRET_KEY

function generateToken(payload: any): string {
  const token = jwt.sign(payload, SECRETKEY, { expiresIn: '21600s' });
  return token;
}

function verifyToken(req: Request, res: Response, next: NextFunction): any {
  try {
    const token = req.header('Authorization');
    if (!token) {
      console.log("token not found")
      throw new Error('Authorization token not found');
    }
    const decoded:any = jwt.verify(token, SECRETKEY);
    req.headers.id=decoded.id;
    req.headers.role=decoded.role;
    req.headers.token=token;
    console.log("next called")
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

export { generateToken, verifyToken };
