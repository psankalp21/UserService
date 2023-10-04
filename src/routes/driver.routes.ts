import express, { Router } from 'express';
import { driver_controller } from '../controllers/driver.controller';

const driver = new driver_controller();

const router: Router = express.Router();

// router.use(verifyToken, accessVerification.verifyAdmin);

router.post('/add_driver', driver.addDriver);
router.get('/get_all_drivers', driver.getAllDrivers);
// router.get('/get_available_drivers', driver.getAvailableDrivers);
router.patch('/remove_driver', driver.removeDriver);
router.post('/toggle_driver_availability', driver.toggleAvailability);

export default router;
