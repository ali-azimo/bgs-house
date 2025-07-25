import bycryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Listing from '../models/listar.model.js';
import Blog from '../models/blog.model.js'
import { errorHandler } from '../utils/erros.js';


export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Apenas podes atualizar seus dados!"))
    try {
        if (req.body.password) {
            req.body.password = bycryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })
        const { password, ...rest } = updateUser._doc
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Apenas o usuario pode deletar sua conta!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('Usuario deletado com sucesso!');
    } catch (error) {
        next(error)
    }
}
export const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('Usuario deslogado com sucesso!');
    } catch (error) {
        next(error)
    }
};
export const getUserListing = async(req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401, 'Apemas o usuario pode ver suas proprias listagens!'));
    }
};
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, "Usuario não encontrado!"));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const getUserBlog = async(req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const blogs = await Blog.find({ userRef: req.params.id });
            res.status(200).json(blogs);
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401, 'Apenas o usuario pode ver suas proprios blogs!'));
    }
};