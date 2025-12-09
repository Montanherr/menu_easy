const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const models = {};
const basename = path.basename(__filename);

// Carrega todos os models baseado em classes
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file !== basename && file.endsWith(".js") && file.indexOf(".") !== 0
  )
  .forEach((file) => {
    const ModelClass = require(path.join(__dirname, file));

    // IMPORTANTÍSSIMO: inicializa o model
    const model = ModelClass.init(sequelize);

    models[model.name] = model;
  });

// Associações
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

module.exports = {
  sequelize,
  ...models
};
