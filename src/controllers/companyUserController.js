const { Company, User } = require("../models");

module.exports = {
  async createCompanyAndUser(req, res) {
    try {
      const { company, user } = req.body;

      // 1. Criar empresa
      const newCompany = await Company.create(company);

      // 2. Criar usuário vinculado à empresa
      const newUser = await User.create({
        ...user,
        companyId: newCompany.id,
        admin: true // Primeiro usuário sempre admin
      });

      return res.status(201).json({
        message: "Empresa e usuário criados com sucesso!",
        company: newCompany,
        user: newUser
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
};
