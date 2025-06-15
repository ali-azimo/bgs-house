import express from 'express';
import { cadastro } from '../controllers/cad.controller.js';
const router = express.Router();


router.post('/cadastro', cadastro);

export default router;