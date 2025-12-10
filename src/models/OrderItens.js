const { Model, DataTypes } = require("sequelize");

class OrderItem extends Model {
  static init(sequelize) {
    return super.init(
      {
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        unitPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
      },
      {
        sequelize,
        modelName: "OrderItem",
        tableName: "OrderItems"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "orderId" });
    this.belongsTo(models.Product, { foreignKey: "productId" });
  }
}

module.exports = OrderItem;
