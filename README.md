# CRUD_React-Ts-Node

Projeto full stack com:

- `client`: React + TypeScript + Vite + Tailwind CSS
- `backend`: Node.js + Express + TypeScript + PostgreSQL

## Estrutura

```bash
CRUD_React-Ts-Node/
  client/
  backend/
```

## Comandos Provaveis Usados No Projeto

Observacao:
Nao existe no repositorio um historico exato do terminal, entao a lista abaixo foi reconstruida com base nos arquivos `package.json`, `package-lock.json` e scripts do projeto.

## Backend

### Criacao inicial

```bash
cd backend
npm init -y
```

### Instalacao de dependencias

```bash
npm install express cors dotenv bcrypt pg drizzle-orm tsconfig-paths
npm install @types/bcrypt
```

### Instalacao de dependencias de desenvolvimento

```bash
npm install -D typescript ts-node nodemon @types/express @types/cors @types/dotenv @types/pg
```

### Dependencia que tambem aparece no projeto

```bash
npm install -D @typescript/native-preview
```

### Rodar o backend

```bash
npm run dev
```

### Gerar build do backend

```bash
npm run build
```

### Rodar build do backend

```bash
npm start
```

## Client

### Criacao inicial provavel

```bash
npm create vite@latest client -- --template react-ts
```

### Instalacao de dependencias principais

```bash
cd client
npm install
npm install react react-dom @tanstack/react-query
```

### Instalacao de dependencias de desenvolvimento

```bash
npm install -D vite typescript @vitejs/plugin-react
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
npm install -D @types/node @types/react @types/react-dom
```

### Rodar o client

```bash
npm run dev
```

### Gerar build do client

```bash
npm run build
```

### Rodar preview do client

```bash
npm run preview
```

### Rodar lint

```bash
npm run lint
```

## Scripts Confirmados Nos package.json

### Backend

```bash
npm run dev
npm run build
npm start
```

### Client

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Exemplo Rapido Para Subir O Projeto

### Terminal 1

```bash
cd backend
npm install
npm run dev
```

### Terminal 2

```bash
cd client
npm install
npm run dev
```

## Exemplo De Comandos Como O Que Voce Citou

Se quiser instalar tipagens manualmente, exemplos:

```bash
npm install @types/bcrypt
npm install -D @types/express
npm install -D @types/cors
npm install -D @types/pg
```

Se quiser instalar bibliotecas principais, exemplos:

```bash
npm install bcrypt
npm install express
npm install dotenv
npm install cors
npm install pg
```
