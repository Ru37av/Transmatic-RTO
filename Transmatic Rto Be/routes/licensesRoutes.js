// src/routes/userRoutes.js
import express from 'express';
import {
    approveLicense,
    createLearningLicense,
    createPermanentLicense,
    getAllLicenses,
    getDuplicateLicense,
    renewLicense
} from "../controllers/licenseController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', authenticateToken, getAllLicenses);
router.post('/learning', authenticateToken, createLearningLicense);
router.put('/permanent', authenticateToken, createPermanentLicense);
router.put('/renew', authenticateToken, renewLicense);
router.post('/duplicate', authenticateToken, getDuplicateLicense);
router.post('/approve', authenticateToken, approveLicense);

export default router;
