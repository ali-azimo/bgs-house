import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createSaude, deleteSaude, updateSaude, getSaude, getSaudes } from '../controllers/saude.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createSaude);
router.delete('/delete/:id', verifyToken, deleteSaude);
router.post('/update/:id', verifyToken, updateSaude);
router.get('/get/:id', getSaude);
router.get('/get', getSaudes);

export default router;
