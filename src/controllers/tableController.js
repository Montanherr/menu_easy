const { Table } = require("../models");
const QRCode = require("qrcode");

module.exports = {
  async index(req, res) {
    const { companyId } = req.query;

    const tables = await Table.findAll({
      where: companyId ? { companyId } : {}
    });

    return res.json(tables);
  },

  async show(req, res) {
    const table = await Table.findByPk(req.params.id);
    return res.json(table);
  },

  async store(req, res) {
    const { number, companyId } = req.body;

    const table = await Table.create({
      number,
      companyId
    });

    const url = `${process.env.BASE_URL}/public/table/${table.id}`;
    const qrcode = await QRCode.toDataURL(url);

    table.qrcode = qrcode;
    await table.save();

    return res.status(201).json(table);
  },

  async update(req, res) {
    await Table.update(req.body, { where: { id: req.params.id } });
    return res.json({ message: "Table updated" });
  },

  async delete(req, res) {
    await Table.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Table deleted" });
  }
};
