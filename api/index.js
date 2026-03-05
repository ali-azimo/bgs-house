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

// Configuração CORS para Hostinger
app.use(cors({
  origin: isProduction 
    ? ['https://lichinga-home.com', 'https://www.lichinga-home.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Logger de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ============================================
// ROTAS DA API
// ============================================

// Health check (obrigatório para Hostinger)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Servidor funcionando',
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

// Status da API
app.get('/api/status', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API BGS online',
    version: '1.0.0',
    endpoints: [
      '/api/user',
      '/api/auth',
      '/api/imo',
      '/api/agri',
      '/api/diver',
      '/api/saude',
      '/api/minin',
      '/api/sem'
    ]
  });
});

// Suas rotas de negócio
app.use('/api/user', userRouter);
app.use('/api/auth', cadRouter);
app.use('/api/imo', imoRouter);
app.use('/api/agri', agriRouter);
app.use('/api/diver', diverRouter);
app.use('/api/saude', saudeRouter);
app.use('/api/minin', mininRouter);
app.use('/api/sem', semRoutes);

// ============================================
// SERVIÇO DO FRONTEND (REACT) - CRÍTICO
// ============================================
const frontendPath = path.join(__dirname, '../front/dist');
console.log(`📁 Procurando frontend em: ${frontendPath}`);

if (fs.existsSync(frontendPath)) {
  console.log('✅ Frontend encontrado! Servindo arquivos estáticos...');
  
  // Servir arquivos estáticos do React
  app.use(express.static(frontendPath));
  
  // Rota principal
  app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
  
  // Todas as rotas não-API vão para o React (SPA)
  app.get('*', (req, res) => {
    // Ignorar requisições à API
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return;
    }
    
    // Verificar se é um arquivo estático
    const fullPath = path.join(frontendPath, req.path);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return res.sendFile(fullPath);
    }
    
    // Enviar index.html para o React Router
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
  
  console.log('✅ Frontend configurado com sucesso');
} else {
  console.log('❌ Frontend NÃO encontrado!');
  console.log('⚠️ Execute "npm run build" na raiz do projeto');
  
  // Página informativa temporária
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) return;
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BGS - Em implantação</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
            .card { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 600px; margin: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            .badge { background: #00a86b; color: white; padding: 5px 15px; border-radius: 50px; display: inline-block; font-size: 14px; margin-bottom: 20px; }
            .endpoints { background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .endpoints h3 { margin-top: 0; color: #555; }
            .endpoints ul { list-style: none; padding: 0; }
            .endpoints li { padding: 8px; border-bottom: 1px solid #ddd; font-family: monospace; }
            .endpoints li:last-child { border-bottom: none; }
            .btn { background: #667eea; color: white; border: none; padding: 10px 30px; border-radius: 50px; font-size: 16px; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px; }
            .btn:hover { background: #764ba2; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">🔧 EM IMPLANTAÇÃO</div>
            <h1>🏗️ BGS - Servidor Principal</h1>
            <p>✅ <strong>Backend ativo:</strong> API funcionando perfeitamente</p>
            <p>⏳ <strong>Frontend:</strong> Aguardando build do React</p>
            
            <div class="endpoints">
              <h3>📡 Endpoints disponíveis:</h3>
              <ul>
                <li><a href="/health">/health</a> - Health check</li>
                <li><a href="/api/status">/api/status</a> - Status da API</li>
                <li>/api/user - Gestão de usuários</li>
                <li>/api/auth - Autenticação</li>
                <li>/api/imo - Imobiliário</li>
                <li>/api/agri - Agrícola</li>
                <li>/api/diver - Diversos</li>
                <li>/api/saude - Saúde</li>
                <li>/api/minin - Mineração</li>
                <li>/api/sem - Semelhantes</li>
              </ul>
            </div>
            
            <p>🔄 O frontend será carregado automaticamente após o build.</p>
            <a href="/api/status" class="btn">Verificar API</a>
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
  const message = err.message || "Erro interno no servidor";
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(70));
  console.log(`🚀 BGS RODANDO NA HOSTINGER`);
  console.log('='.repeat(70));
  console.log(`📌 URL: https://lichega-home.com`);
  console.log(`🌍 Ambiente: ${isProduction ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}`);
  console.log(`🔌 Porta: ${PORT}`);
  console.log(`🩺 Health: /health`);
  console.log(`📡 API: /api/status`);
  console.log(`📁 Frontend: ${fs.existsSync(frontendPath) ? '✅ ATIVO' : '❌ Aguardando build'}`);
  console.log('='.repeat(70) + '\n');
});