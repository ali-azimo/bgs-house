import express from 'express';
import { getSem } from '../controllers/sem.controller.js';
import { verifyToken } from '../utils/verificar.usuario.js';

const router = express.Router();

router.get('/:tipo/:id', getSem);

export default router;
