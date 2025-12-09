const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(sequelize) {
    return super.init(
      {
        fantasyName: { type: DataTypes.STRING, allowNull: false },
        corporateName: { type: DataTypes.STRING, allowNull: false },
        document: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING }
      },
      {
        sequelize,
        modelName: "Company",
        tableName: "Companies"
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: "companyId" });
    this.hasMany(models.Category, { foreignKey: "companyId" });
    this.hasMany(models.Product, { foreignKey: "companyId" });
    this.hasMany(models.Table, { foreignKey: "companyId" });
  }
}

module.exports = Company;
