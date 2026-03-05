import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

// Importa rotas
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';
import imoRouter from './routes/imo.route.js';
import agriRouter from './routes/agri.route.js';
import diverRouter from './routes/diver.route.js';
import saudeRouter from './routes/saude.route.js';
import mininRouter from './routes/minin.route.js';
import semRoutes from './routes/sem.route.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// ============================================
// CONEXÃO MONGODB
// ============================================
console.log('🔌 Conectando ao MongoDB...');
mongoose.connect(process.env.MONGO)
  .then(() => console.log('✅ MongoDB conectado com sucesso'))
  .catch(err => {
    console.error('❌ Erro fatal ao conectar MongoDB:', err);
    process.exit(1);
  });

// ============================================
// MIDDLEWARES
// ============================================
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Configuração CORS
app.use(cors({
  origin: isProduction 
    ? ['https://lichinga-home.com', 'https://www.lichinga-home.com', 'https://bgs-imo.com', 'https://www.bgs-imo.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ============================================
// ROTAS DA API
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Servidor funcionando',
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API BGS online',
    version: '1.0.0'
  });
});

// Suas rotas
app.use('/api/user', userRouter);
app.use('/api/auth', cadRouter);
app.use('/api/imo', imoRouter);
app.use('/api/agri', agriRouter);
app.use('/api/diver', diverRouter);
app.use('/api/saude', saudeRouter);
app.use('/api/minin', mininRouter);
app.use('/api/sem', semRoutes);

// ============================================
// SERVIÇO DO REACT (CLIENT)
// ============================================
const clientPath = path.join(__dirname, '../client/dist');
console.log(`📁 Procurando React em: ${clientPath}`);

if (fs.existsSync(clientPath)) {
  console.log('✅ React encontrado! Servindo arquivos estáticos...');
  
  // Servir arquivos estáticos
  app.use(express.static(clientPath));
  
  // Rota principal
  app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
  
  // Todas as rotas não-API vão para o React
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/health')) {
      const fullPath = path.join(clientPath, req.path);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return res.sendFile(fullPath);
      }
      res.sendFile(path.join(clientPath, 'index.html'));
    }
  });
  
  console.log('✅ React configurado com sucesso');
} else {
  console.log('❌ React NÃO encontrado em:', clientPath);
  console.log('⚠️ Execute "npm run build" na raiz do projeto');
  
  // Página informativa
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) return;
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BGS - Em implantação</title>
          <style>
            body { font-family: Arial; text-align: center; padding: 50px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
            h1 { color: #333; }
            .badge { background: #00a86b; color: white; padding: 5px 15px; border-radius: 50px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="badge">🔧 EM IMPLANTAÇÃO</div>
            <h1>🏗️ BGS - Servidor</h1>
            <p>✅ API: <a href="/api/status">/api/status</a></p>
            <p>✅ Health: <a href="/health">/health</a></p>
            <p>⏳ React em build. Execute: npm run build</p>
          </div>
        </body>
      </html>
    `);
  });
}

// ============================================
// MIDDLEWARE DE ERRO
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno";
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(60));
  console.log(`🚀 BGS RODANDO NA HOSTINGER`);
  console.log('='.repeat(60));
  console.log(`📌 Domínio: lichinga-home.com | bgs-imo.com`);
  console.log(`🌍 Ambiente: ${isProduction ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}`);
  console.log(`🔌 Porta: ${PORT}`);
  console.log(`📁 React: ${fs.existsSync(clientPath) ? '✅ ATIVO' : '❌ Aguardando build'}`);
  console.log('='.repeat(60) + '\n');
});