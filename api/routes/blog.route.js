import express from 'express';
import { verifyToken } from '../utils/verificar.usuario.js';
import { createBlog, deleteBlog, updateBlog, getBlog} from '../controllers/post.controller.js';
const router = express.Router();



router.post('/create', verifyToken, createBlog)
router.delete('/delete/:id', verifyToken, deleteBlog);
router.post('/update/:id', verifyToken, updateBlog)
router.get('/get/:id', getBlog);


export default router;