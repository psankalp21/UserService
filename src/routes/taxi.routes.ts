import express, { Router } from 'express';
import { verifyToken } from '../middlewares/jwt';
import { taxi_controller } from '../controllers/taxi.controller';

const taxi = new taxi_controller();

const router: Router = express.Router();

router.use(verifyToken);

router.post('/add_taxi', taxi.addTaxi);
router.patch('/update_taxi_details', taxi.updateTaxiDetails);
router.get('/get_all_taxis', taxi.getAllTaxi);
router.get('/get_available_taxis', taxi.getAvailableTaxi);
router.get('/get_taxi_by_id', taxi.getTaxiById);
router.patch('/toggle_taxi_status', taxi.toggleTaxiStatus);

export default router
