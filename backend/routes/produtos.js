const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");

// Cadastro
router.post("/cadastrar", async (req, res) => {
  const { nomelanchonete, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "INSERT INTO lanchonetes (nome, email, senha) VALUES ($1, $2, $3) RETURNING id",
      [nomelanchonete, email, hash]
    );

    res.status(201).json({ sucesso: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao cadastrar lanchonete." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM lanchonetes WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: "E-mail não encontrado." });
    }

    const lanchonete = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, lanchonete.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    res.status(200).json({ sucesso: true, id: lanchonete.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
});

module.exports = router;
