const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "Categories"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: "companyId" });
    this.hasMany(models.Product, { foreignKey: "categoryId" });
  }
}

module.exports = Category;
