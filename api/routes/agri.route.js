import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createAgri, deleteAgri, updateAgri, getAgri, getAgris } from '../controllers/agri.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createAgri);
router.delete('/delete/:id', verifyToken, deleteAgri);
router.post('/update/:id', verifyToken, updateAgri);
router.get('/get/:id', getAgri);
router.get('/get', getAgris);

export default router;
