const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        image: { type: DataTypes.STRING },
        available: { type: DataTypes.BOOLEAN, defaultValue: true }
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "Products"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: "companyId" });
    this.belongsTo(models.Category, { foreignKey: "categoryId" });
  }
}

module.exports = Product;
