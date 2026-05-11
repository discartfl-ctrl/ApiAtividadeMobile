# API de Jogos - Trabalho Prático Mobile

API RESTful para gerenciar uma biblioteca pessoal de jogos e avaliações.

---

## Como rodar localmente

```bash
npm install
npm start
```

A API estará disponível em `http://localhost:3000`.

---

## Deploy (Render — recomendado)

1. Suba o projeto no GitHub (repositório público ou privado).
2. Acesse [render.com](https://render.com) e crie uma conta gratuita.
3. Clique em **New → Web Service** e conecte seu repositório.
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Clique em **Deploy**. A URL pública será gerada automaticamente.

---

## Endpoints

### POST /login
Autentica o usuário e retorna um token UUID.

**Request:**
```json
{ "email": "usuario@esoft.com", "password": "Abc123" }
```
**Response 200:**
```json
{ "token": "550e8400-e29b-41d4-a716-446655440000" }
```

---

### GET /jogos
Retorna todos os jogos cadastrados.

**Response 200:**
```json
[
  { "id": 1, "nome": "The Legend of Zelda", "tipo": "Aventura", "nota": 10, "review": "Um clássico absoluto." },
  { "id": 2, "nome": "FIFA 23", "tipo": "Esporte", "nota": 7, "review": "Bom para jogar com amigos." }
]
```

---

### GET /jogos/:id
Retorna um jogo pelo ID.

**Response 200:**
```json
{ "id": 1, "nome": "The Legend of Zelda", "tipo": "Aventura", "nota": 10, "review": "Um clássico absoluto." }
```

---

### POST /jogos
Cadastra um novo jogo.

**Request:**
```json
{ "nome": "Elden Ring", "tipo": "RPG", "nota": 9, "review": "Desafiador e visualmente impecável." }
```
**Response 201:**
```json
{ "id": 3, "nome": "Elden Ring", "tipo": "RPG", "nota": 9, "review": "Desafiador e visualmente impecável." }
```

---

### PUT /jogos/:id
Atualiza todos os dados de um jogo (todos os campos obrigatórios).

**Request:**
```json
{ "nome": "Elden Ring - DLC", "tipo": "RPG", "nota": 10, "review": "Melhorou o que já era perfeito." }
```
**Response 200:**
```json
{ "id": 3, "nome": "Elden Ring - DLC", "tipo": "RPG", "nota": 10, "review": "Melhorou o que já era perfeito." }
```

---

### DELETE /jogos/:id
Remove um jogo.

**Response 204 No Content** (sem corpo)
