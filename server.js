const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// --- In-memory database ---
let jogos = [
  { id: 1, nome: "The Legend of Zel             da", tipo: "Aventura", nota: 10, review: "Um clássico absoluto." },
  { id: 2, nome: "FIFA 23", tipo: "Esporte", nota: 7, review: "Bom para jogar com amigos." }
];
let nextId = 3;

// --- POST /login ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'usuario@esoft.com' && password === 'Abc123') {
    return res.status(200).json({ token: uuidv4() });
  }

  return res.status(401).json({ error: 'Credenciais inválidas.' });
});

// --- GET /jogos ---
app.get('/jogos', (req, res) => {
  return res.status(200).json(jogos);
});

// --- GET /jogos/:id ---
app.get('/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = jogos.find(j => j.id === id);

  if (!jogo) {
    return res.status(404).json({ error: 'Jogo não encontrado.' });
  }

  return res.status(200).json(jogo);
});

// --- POST /jogos ---
app.post('/jogos', (req, res) => {
  const { nome, tipo, nota, review } = req.body;

  const novoJogo = { id: nextId++, nome, tipo, nota, review };
  jogos.push(novoJogo);

  return res.status(201).json(novoJogo);
});

// --- PUT /jogos/:id ---
app.put('/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = jogos.findIndex(j => j.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Jogo não encontrado.' });
  }

  const { nome, tipo, nota, review } = req.body;
  jogos[index] = { id, nome, tipo, nota, review };

  return res.status(200).json(jogos[index]);
});

// --- DELETE /jogos/:id ---
app.delete('/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = jogos.findIndex(j => j.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Jogo não encontrado.' });
  }

  jogos.splice(index, 1);
  return res.status(204).send();
});

// --- Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
