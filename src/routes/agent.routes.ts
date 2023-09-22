import express, { Router } from 'express';
import { verifyToken } from '../middlewares/jwt';
import { agent_taxi_controller } from '../controllers/agentControllers/taxi.agentController';
import { agent_driver_controller } from '../controllers/agentControllers/driver.agentController';
import { accessVerification } from '../middlewares/accessVerification';

const agentTaxi = new agent_taxi_controller();
const agentDriver = new agent_driver_controller();

const router: Router = express.Router();

router.use(verifyToken, accessVerification.verifyAdmin);

router.post('/add_taxi', agentTaxi.addTaxi);
router.get('/get_taxis', agentTaxi.getAllTaxi);
router.get('/get_available_taxis', agentTaxi.getAvailableTaxi);
router.get('/get_taxi_by_id', agentTaxi.getTaxiById);
router.patch('/toggle_taxi_status', agentTaxi.toggleTaxiStatus);
router.post('/add_driver', agentDriver.addDriver);
router.get('/get_all_drivers', agentDriver.getAllDrivers);
router.get('/get_available_drivers', agentDriver.getAvailableDrivers);
router.patch('/remove_driver', agentDriver.removeDriver);

export default router
