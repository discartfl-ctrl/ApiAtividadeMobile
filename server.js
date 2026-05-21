const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let jogos = [
  { id: 1, nome: "The Legend of Zelda", tipo: "Aventura", nota: 10, review: "Um clássico absoluto." },
  { id: 2, nome: "FIFA 23", tipo: "Esporte", nota: 7, review: "Bom para jogar com amigos." },
  { id: 4, nome: "Minecraft", tipo: "Sandbox", nota: 10, review: "Criatividade sem limites." },
  { id: 8, nome: "Hollow Knight", tipo: "Metroidvania", nota: 9, review: "Arte linda e gameplay desafiador." },
  { id: 10, nome: "Animal Crossing: New Horizons", tipo: "Simulação", nota: 9, review: "Relaxante e muito carismático." }
];

// --- Dynamic ID generator ---
function gerarProximoId() {
  const idsExistentes = new Set(jogos.map(j => j.id));
  let id = 1;
  while (idsExistentes.has(id)) {
    id++;
  }
  return id;
}

// --- Helpers ---
function validarJogo({ nome, nota }) {
  const erros = [];
  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    erros.push('O campo "nome" é obrigatório e deve ser texto.');
  }
  if (nota !== undefined && nota !== null) {
    const notaNum = Number(nota);
    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
      erros.push('O campo "nota" deve ser um número entre 0 e 10.');
    }
  }
  return erros;
}

// --- POST /login ---
app.post('/login', (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }
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
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID deve ser um número.' });
  }
  const jogo = jogos.find(j => j.id === id);
  if (!jogo) return res.status(404).json({ error: 'Jogo não encontrado.' });
  return res.status(200).json(jogo);
});

// --- POST /jogos ---
app.post('/jogos', (req, res) => {
  const { nome, tipo, nota, review } = req.body ?? {};

  const erros = validarJogo({ nome, nota });
  if (erros.length > 0) {
    return res.status(400).json({ errors: erros });
  }

  const novoJogo = {
    id: gerarProximoId(),
    nome: nome.trim(),
    tipo: tipo?.trim() || 'Indefinido',
    nota: Number(nota) ?? 0,
    review: review?.trim() || '',
  };

  jogos.push(novoJogo);
  return res.status(201).json(novoJogo);
});

// --- PUT /jogos/:id ---
app.put('/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID deve ser um número.' });
  }

  const index = jogos.findIndex(j => j.id === id);
  if (index === -1) return res.status(404).json({ error: 'Jogo não encontrado.' });

  const { nome, tipo, nota, review } = req.body ?? {};

  const erros = validarJogo({
    nome: nome ?? jogos[index].nome,
    nota,
  });
  if (erros.length > 0) {
    return res.status(400).json({ errors: erros });
  }

  jogos[index] = {
    id,
    nome: nome?.trim() ?? jogos[index].nome,
    tipo: tipo?.trim() ?? jogos[index].tipo,
    nota: nota !== undefined ? Number(nota) : jogos[index].nota,
    review: review?.trim() ?? jogos[index].review,
  };

  return res.status(200).json(jogos[index]);
});

// --- DELETE /jogos/:id ---
app.delete('/jogos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID deve ser um número.' });
  }

  const index = jogos.findIndex(j => j.id === id);
  if (index === -1) return res.status(404).json({ error: 'Jogo não encontrado.' });

  jogos.splice(index, 1);
  return res.status(204).send();
});

// --- 404 for unknown routes ---
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
