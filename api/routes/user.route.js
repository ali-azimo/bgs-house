import express from 'express';
import { deleteUser, getUser, getUserAgri, getUserDiver, getUserImo, getUserMinin, getUserSaude, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verificar.usuario.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser)
router.get('/imo/:id', verifyToken, getUserImo);
router.get('/agri/:id', verifyToken, getUserAgri);
router.get('/diver/:id', verifyToken, getUserDiver);
router.get('/minin/:id', verifyToken, getUserMinin);
router.get('/saude/:id', verifyToken, getUserSaude);



export default router;