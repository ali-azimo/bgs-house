import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.log(err);
});
// Importando o express
const app = express();
app.use(express.json());

app.listen(3000, () => {
        console.log("O Serividor está rodando na porta 3000!");
    }
);

//Importando as rotas
app.use("/api/user", userRouter);
app.use("/api/cad", cadRouter);


//Mostrar erros
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});