import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "fs";

// Rotas
import userRouter from "./routes/user.route.js";
import cadRouter from "./routes/cad.route.js";
import imoRouter from "./routes/imo.route.js";
import agriRouter from "./routes/agri.route.js";
import diverRouter from "./routes/diver.route.js";
import saudeRouter from "./routes/saude.route.js";
import mininRouter from "./routes/minin.route.js";
import semRoutes from "./routes/sem.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Corrigir __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONEXÃO MONGODB - VERSÃO MELHORADA
// ============================================
console.log("🔌 Conectando ao MongoDB...");

// Verifica se a string MONGO existe
if (!process.env.MONGO) {
  console.error("❌ ERRO: Variável MONGO não encontrada no arquivo .env");
  console.error("📁 Local esperado: F:\\BGS\\bgs-house\\.env");
  process.exit(1);
}

// Opções de conexão para resolver o erro ECONNREFUSED
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  family: 4, // 👈 ISSO RESOLVE O ERRO! Força IPv4
  retryWrites: true,
  w: "majority"
};

mongoose
  .connect(process.env.MONGO, mongooseOptions)
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar MongoDB:");
    console.error(err);
    console.error("\n🔍 POSSÍVEIS CAUSAS:");
    console.error("1. Senha incorreta no .env");
    console.error("2. IP não liberado no MongoDB Atlas");
    console.error("3. Problema de internet/DNS");
    process.exit(1);
  });

// ============================================
// MIDDLEWARES
// ============================================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: isProduction
      ? [
          "https://lichinga-home.com",
          "https://www.lichinga-home.com",
          "https://bgs-imo.com",
          "https://www.bgs-imo.com",
        ]
      : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// Logger simples
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ============================================
// ROTAS DE TESTE
// ============================================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    server: "BGS API",
    time: new Date(),
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "API BGS online",
  });
});

// ============================================
// ROTAS DA API
// ============================================
app.use("/api/user", userRouter);
app.use("/api/auth", cadRouter);
app.use("/api/imo", imoRouter);
app.use("/api/agri", agriRouter);
app.use("/api/diver", diverRouter);
app.use("/api/saude", saudeRouter);
app.use("/api/minin", mininRouter);
app.use("/api/sem", semRoutes);

// ============================================
// SERVIR FRONTEND REACT
// ============================================
const clientPath = path.join(__dirname, "../client/dist");

console.log("📁 Procurando React em:", clientPath);

if (fs.existsSync(clientPath)) {
  console.log("✅ React encontrado");
  app.use(express.static(clientPath));

  // React Router
  app.get("/*", (req, res) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/health")) {
      return res.status(404).json({
        success: false,
        message: "API route not found",
      });
    }
    res.sendFile(path.join(clientPath, "index.html"));
  });
} else {
  console.log("⚠️ React não encontrado. Execute build.");
  app.get("/", (req, res) => {
    res.send(`
    <h1>BGS SERVER</h1>
    <p>API funcionando.</p>
    <p><a href="/api/status">API STATUS</a></p>
    `);
  });
}

// ============================================
// MIDDLEWARE DE ERRO
// ============================================
app.use((err, req, res, next) => {
  console.error("❌ Erro:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Erro interno",
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, "0.0.0.0", () => {
  console.log("\n==============================");
  console.log("🚀 BGS SERVER INICIADO");
  console.log("==============================");
  console.log("🌍 Ambiente:", isProduction ? "PRODUÇÃO" : "DESENVOLVIMENTO");
  console.log("🔌 Porta:", PORT);
  console.log("📁 React:", fs.existsSync(clientPath) ? "ATIVO" : "NÃO BUILDADO");
  console.log("==============================\n");
});