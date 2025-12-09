const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
async register(req, res) {
  try {
    const { name, email, password, cpf, admin, companyId } = req.body;

    console.log("📌 Dados recebidos:", req.body);

    // 🔎 Verifica e-mail existente
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // 🔎 Verifica CPF existente
    const cpfExists = await User.findOne({ where: { cpf } });
    if (cpfExists) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // 👍 Cria o usuário
    const user = await User.create({
      name,
      email,
      password,
      cpf,
      admin: admin || false,
      companyId
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error("❌ ERRO AO REGISTRAR USUÁRIO:", error);
    return res.status(500).json({ error: error.message });
  }
},

async login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    // 🔐 Gera o token SEM expiresIn (token infinito)
    const token = jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_SECRET
    );

    return res.json({ token, user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

};
