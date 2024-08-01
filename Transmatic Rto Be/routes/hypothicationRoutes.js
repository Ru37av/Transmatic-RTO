import express from 'express';
import {authenticateToken} from "../middleware/authMiddleware.js";
import {createHypothicationRequest} from "../controllers/hypoController.js";

const router = express.Router();

router.post('/', authenticateToken, createHypothicationRequest);

export default router;
