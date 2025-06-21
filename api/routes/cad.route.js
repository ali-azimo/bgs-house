import express from 'express';
import { cadastro, google, signin } from '../controllers/cad.controller.js';
const router = express.Router();


router.post('/cadastro', cadastro);
router.post('/signin', signin);
router.post('/google', google);
//router.get('/signout', signOut)

export default router;