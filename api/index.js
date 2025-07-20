import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';
import listingRouter from './routes/listar.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


//Diploy method
import path from 'path';
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log('Conectado no banco MongoDB');
}).catch((err) => {
    console.log(err);
});


const __dirname = path.resolve();



const app = express();
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
        console.log(`Servidor aberto a porta ${PORT}`);
    }

);
//Import Routers
app.use("/api/user", userRouter);
app.use('/api/auth', cadRouter);
app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, 'client', 'dist')));
// app.get("*splat", (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

// CORS para permitir acesso do Vercel
app.use(cors({
  origin: 'https://bgs-house.vercel.app',
  credentials: true,
}));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});