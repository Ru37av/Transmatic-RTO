import express from 'express';
import {getAllUsers, signIn, signOut, signUp} from '../controllers/userController.js';
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/admin/signUp', (req, res, next) => {
    req.isAdmin = true;
    next();
}, signUp);
router.post('/admin/signIn', (req, res, next) => {
    req.isAdmin = true;
    next();
}, signIn);
router.get('/signOut', signOut);
router.get('/me', authenticateToken, (req, res) =>  res.status(200).json({}));

export default router;
