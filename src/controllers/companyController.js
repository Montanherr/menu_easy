const { Company } = require("../models");

module.exports = {
  async index(req, res) {
    const companies = await Company.findAll();
    return res.json(companies);
  },

  async show(req, res) {
    const company = await Company.findByPk(req.params.id);
    return res.json(company);
  },

  async store(req, res) {
    try {
      const company = await Company.create(req.body);
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    await Company.update(req.body, { where: { id: req.params.id } });
    return res.json({ message: "Company updated" });
  },

  async delete(req, res) {
    await Company.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Company removed" });
  }
};
