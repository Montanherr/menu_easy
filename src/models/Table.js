const { Model, DataTypes } = require("sequelize");

class Table extends Model {
  static init(sequelize) {
    return super.init(
      {
        number: { type: DataTypes.INTEGER, allowNull: false },
        qrcode: { type: DataTypes.STRING }
      },
      {
        sequelize,
        modelName: "Table",
        tableName: "Tables"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: "companyId" });
  }
}

module.exports = Table;
