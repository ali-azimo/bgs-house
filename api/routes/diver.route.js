import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createDiver, deleteDiver, updateDiver, getDiver, getDivers } from '../controllers/diver.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createDiver);
router.delete('/delete/:id', verifyToken, deleteDiver);
router.post('/update/:id', verifyToken, updateDiver);
router.get('/get/:id', getDiver);
router.get('/get', getDivers);

export default router;
