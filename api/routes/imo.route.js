import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createImo, deleteImo, updateImo, getImo, getImos } from '../controllers/imo.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createImo);
router.delete('/delete/:id', verifyToken, deleteImo);
router.post('/update/:id', verifyToken, updateImo);
router.get('/get/:id', getImo);
router.get('/get', getImos);

export default router;
