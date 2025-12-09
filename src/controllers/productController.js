const { Product } = require("../models");

module.exports = {
  async index(req, res) {
    const { companyId } = req.query;

    const products = await Product.findAll({
      where: companyId ? { companyId } : {}
    });

    return res.json(products);
  },

  async show(req, res) {
    const product = await Product.findByPk(req.params.id);
    return res.json(product);
  },

  async store(req, res) {
    const { name, description, price, categoryId, companyId, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      companyId,
      image
    });

    return res.status(201).json(product);
  },

  async update(req, res) {
    await Product.update(req.body, { where: { id: req.params.id } });
    return res.json({ message: "Product updated" });
  },

  async delete(req, res) {
    await Product.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Product deleted" });
  },

  async toggleAvailability(req, res) {
    const product = await Product.findByPk(req.params.id);
    product.available = !product.available;
    await product.save();
    return res.json(product);
  }
};
