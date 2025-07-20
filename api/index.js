import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';
import listingRouter from './routes/listar.route.js';
import cookieParser from 'cookie-parser';


//Utilizado para o modo producao
import path from 'path';
dotenv.config();

mongoose
    .connect(process.env.MONGO).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.log(err);
});

//Definindo o diretório de trabalho
const __dirname = path.resolve();


// Importando o express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
        console.log("O Serividor está rodando na porta 3000!");
    }
);

//Importando as rotas
app.use("/api/user", userRouter);
app.use("/api/cad", cadRouter);
app.use('/api/listing', listingRouter);


// Definindo o diretório de trabalho
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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