import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
// Importa rotas
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';
import listingRouter from './routes/listar.route.js';
import { access } from 'fs';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));


// Configura CORS
// Configuração EXTENDIDA do CORS (resolve o pré-voo OPTIONS)
app.use(cors({
  origin: 'https://bgs-house-git-main-ali-azimos-projects.vercel.app/', // URL do seu frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Se usar cookies/tokens
}));

// Middleware para lidar explicitamente com OPTIONS
app.options('/', cors()); // Habilita pré-voo para todas as rotas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api/user', userRouter);
app.use('/api/auth', cadRouter);
app.use('/api/listing', listingRouter);

// Testar backend
app.get('/', (req, res) => {
  res.send('API online 🚀');
});


// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
