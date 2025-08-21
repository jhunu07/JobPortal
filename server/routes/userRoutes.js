import express from 'express';
import { applyForJob, getUserApplications, getUserData, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';

import clerkWebhooks from '../controllers/webhooks.js';
const router = express.Router();
// Get user data 

router.get('/user', getUserData);

// Apply for job
router.post('/apply', applyForJob);

// Get user applications
router.get('/applications', getUserApplications);

// Update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume);

export default router;  