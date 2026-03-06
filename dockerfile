# Dockerfile (na raiz do projeto)
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build do frontend React
WORKDIR /app/client
RUN npm ci && npm run build

# Voltar para a raiz e configurar o servidor
WORKDIR /app
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "api/index.js"]