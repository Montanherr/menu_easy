const { Order, OrderItem, Product, Table, Company } = require("../models");

module.exports = {
  // =============================
  // CREATE (com itens)
  // =============================
  async create(req, res) {
    try {
      const {
        tableId,
        companyId,
        fullName,
        phone,
        address,
        observations,
        additionalInfo,
        paymentMethod,
        needChange,
        changeAmount,
        items,
      } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: "Order must contain items" });
      }

      // Criar pedido
      const order = await Order.create({
        tableId,
        companyId,
        fullName,
        phone,
        address,
        observations,
        additionalInfo,
        paymentMethod,
        needChange,
        changeAmount: needChange ? changeAmount : null,
      });

      let totalOrder = 0;

      // Criar itens do pedido
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (!product) continue;

        const total = Number(product.price) * item.quantity;
        totalOrder += total;

        await OrderItem.create({
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          unitPrice: product.price, // preco unitário
          totalPrice: total, // total do item
        });
      }

      // Atualizar total do pedido
      await order.update({ total: totalOrder });

      return res.status(201).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // =============================
  // READ ALL
  // =============================
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: OrderItem, include: [{ model: Product }] },
          { model: Table },
          { model: Company },
        ],
        order: [["id", "DESC"]],
      });

      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // =============================
  // READ ONE
  // =============================
  async getOne(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id, {
        include: [
          { model: OrderItem, include: [{ model: Product }] },
          { model: Table },
          { model: Company },
        ],
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // =============================
  // UPDATE
  // =============================
  async update(req, res) {
    try {
      const { id } = req.params;

      const allowedFields = [
        "fullName",
        "phone",
        "address",
        "observations",
        "paymentMethod",
        "status",
        "needChange",
        "changeAmount",
      ];

      const updateData = {};

      for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
          updateData[key] = req.body[key];
        }
      }

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: "Order not found" });

      await order.update(updateData);

      return res.json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // =============================
  // DELETE
  // =============================
  async delete(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: "Order not found" });

      await OrderItem.destroy({ where: { orderId: id } });
      await order.destroy();

      return res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
