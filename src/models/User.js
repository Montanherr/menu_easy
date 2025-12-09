const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        cpf: { type: DataTypes.STRING, unique: true },
        admin: { type: DataTypes.BOOLEAN, defaultValue: false }
      },
      {
        sequelize,
        modelName: "User",
        tableName: "Users",
        hooks: {
          beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
          },
          beforeUpdate: async (user) => {
            if (user.changed("password")) {
              user.password = await bcrypt.hash(user.password, 10);
            }
          }
        }
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: "companyId" });
  }
}

module.exports = User;
