import express, { Router } from 'express';
import auth from './identities.routes';
import agent from './taxi.routes'
import driver from './driver.routes'

const router: Router = express.Router();
router.use('/user', auth,agent,driver);

export default router;
