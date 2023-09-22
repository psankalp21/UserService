import express, { Router } from 'express';
import { agent_auth_controller } from '../controllers/identitiesControllers/agent.identitiesController';
import { user_auth_controller } from '../controllers/identitiesControllers/user.identitiesController';
import { driver_auth_controller } from '../controllers/identitiesControllers/driver.identitiesController';

const userAuthRoutes = new user_auth_controller();
const agentAuthRoutes = new agent_auth_controller();
const driverAuthRoutes = new driver_auth_controller();

const router: Router = express.Router();

//user related routes 
router.post('/user_signup', userAuthRoutes.requestSignup);
router.post('/user_signup_verification', userAuthRoutes.verifyEmailandSignup);
router.post('/user_login', userAuthRoutes.login);
router.post('/user_forgot_password', userAuthRoutes.forgotPassword);

//agent related routes 
router.post('/agent_signup', agentAuthRoutes.requestSignup);
router.post('/agent_signup_verification', agentAuthRoutes.verifyEmailandSignup);
router.post('/agent_login', agentAuthRoutes.login);
router.post('/agent_forgot_password', agentAuthRoutes.forgotPassword);

//driver related routes 
router.post('/driver_login', driverAuthRoutes.login);
router.post('/driver_forgot_password', driverAuthRoutes.forgotPassword);

export default router;
