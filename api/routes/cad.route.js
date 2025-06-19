import express from 'express';
import { cadastro, signin } from '../controllers/cad.controller.js';
const router = express.Router();


router.post('/cadastro', cadastro);
router.post('/signin', signin);

export default router;