import express from 'express';
import { deleteUser, getUser, getUserBlog, getUserListing, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verificar.usuario.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listing/:id', verifyToken, getUserListing);
router.get('/blog/:id', verifyToken, getUserBlog);
router.get('/:id', verifyToken, getUser)



export default router;