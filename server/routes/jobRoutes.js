import express from 'express';
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router();
// Routes to get all job data 

router.get('/', getJobs);

// Route to get jon by id 
router.get('/:id', getJobById);


export default router;