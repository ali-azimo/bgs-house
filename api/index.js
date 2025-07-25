import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
// Importa rotas
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';
import listingRouter from './routes/listar.route.js';
import blogRouter from './routes/blog.route.js'
import cors from 'cors';
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// app.use(cors({
//     origin: 'https://www.bgs-imo.com', 
//     credentials: true
// }));

const allowedOrigins = [
  'http://localhost:5173',        // desenvolvimento local
  'https://www.bgs-imo.com'       // produção na Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api/user', userRouter);
app.use('/api/auth', cadRouter);
app.use('/api/listing', listingRouter);
app.use('/api/blog', blogRouter);


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
