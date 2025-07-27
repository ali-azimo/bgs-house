import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createMinin, deleteMinin, updateMinin, getMinin, getMinins } from '../controllers/minin.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createMinin);
router.delete('/delete/:id', verifyToken, deleteMinin);
router.post('/update/:id', verifyToken, updateMinin);
router.get('/get/:id', getMinin);
router.get('/get', getMinins);

export default router;
