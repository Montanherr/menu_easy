const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: DataTypes.STRING,
          unique: true
        },

        // Dados cliente
        fullName: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING },
        observations: { type: DataTypes.TEXT },
        additionalInfo: { type: DataTypes.TEXT },

        // Pagamento
        paymentMethod: { type: DataTypes.STRING, allowNull: false },
        needChange: { type: DataTypes.BOOLEAN, defaultValue: false },
        changeAmount: { type: DataTypes.DECIMAL(10, 2) },

        // Pedido
        total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
        status: { type: DataTypes.STRING, defaultValue: "pending" }
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "Orders",
        hooks: {
          beforeCreate: async (order) => {
            const random = Math.floor(10000 + Math.random() * 90000);
            order.code = `SH-${random}`;
          }
        }
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Table, { 
      foreignKey: {
        name: "tableId",
        allowNull: true
      }
    });

    this.belongsTo(models.Company, { 
      foreignKey: {
        name: "companyId",
        allowNull: false
      }
    });

    this.hasMany(models.OrderItem, { 
      foreignKey: "orderId"
    });
  }
}

module.exports = Order;
