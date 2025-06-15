import jwt from "jsonwebtoken";
import { errorHandler } from './erros.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;


    if (!token) return next(errorHandler(401, "Usuario não autenticado!"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Token inválido!"));
        req.user = user;
        next();
    });
};