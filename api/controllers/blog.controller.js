import Blog from "../models/blog.model.js";
import { errorHandler } from "../utils/erros.js";

export const createBlog = async(req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        return res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
}

export const deleteBlog = async(req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(errorHandler(404, 'Blog não encontrado'));
    }
    if (req.user.id !== blog.userRef) {
        return next(errorHandler(401, 'Podes deletar apenas o seu Blog'));
    }
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json('Blog deletado com sucesso!');
    } catch (error) {
        next(error);
    }
}

export const updateBlog = async(req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(errorHandler(401, "Blog não encontrado"));
    }
    if (req.user.id !== blog.userRef) {
        return next(errorHandler(401, "Apenas podes atualizar o seu Blog"));
    }
    try {
        const updateBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.status(200).json(updateBlog);
    } catch (error) {
        next(error);
    }
}

export const getBlog = async(req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return next(errorHandler(404, "Blog não encontrado"));
        }
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
}

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
