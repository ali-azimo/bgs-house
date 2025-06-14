import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.log(err);
});


const app = express();
app.use(express.json());

app.listen(3000, () => {
        console.log("O Serividor está rodando na porta 3000!");
    }
);

//Importando as rotas
app.use("/api/user", userRouter);
