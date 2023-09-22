import express, { Router } from 'express';
import { driver_controller } from '../controllers/driverControllers/driver.controller';

const driveroutes = new driver_controller();

const router: Router = express.Router();

//driver related routes 
router.post('/toggle_driver_availability', driveroutes.toggleAvailability);

export default router;
