#!/bin/bash
echo "🚀 Iniciando deploy..."

# Build local (opcional)
cd client && npm run build
cd ..

# Git commit e push
git add .
git commit -m "Deploy: $(date)"
git push origin main

echo "✅ Deploy realizado! Aguarde o Dokploy atualizar."