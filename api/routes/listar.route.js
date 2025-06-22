import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createListing, deleteListing, updateListing, getListing } from '../controllers/listar.controller.js';
const router = express.Router();



router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing);


export default router;