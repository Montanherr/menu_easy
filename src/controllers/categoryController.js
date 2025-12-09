const { Category } = require("../models");

module.exports = {
  async index(req, res) {
    const { companyId } = req.query; // opcional para filtrar

    const categories = await Category.findAll({
      where: companyId ? { companyId } : {}
    });

    return res.json(categories);
  },

  async show(req, res) {
    const category = await Category.findByPk(req.params.id);
    return res.json(category);
  },

  async store(req, res) {
    const { name, companyId } = req.body;

    const category = await Category.create({
      name,
      companyId
    });

    return res.status(201).json(category);
  },

  async update(req, res) {
    await Category.update(req.body, { where: { id: req.params.id } });
    return res.json({ message: "Category updated" });
  },

  async delete(req, res) {
    await Category.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Category deleted" });
  }
};
