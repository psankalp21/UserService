import express, { Router } from 'express';
import auth from './identities.routes';
import agent from './taxi.routes'

const router: Router = express.Router();
router.use('/user', auth,agent);

export default router;
