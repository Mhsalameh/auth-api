"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const users = require("../auth/models/users-model.js");
const dotenv = require("dotenv");
const {Food} = require("./models.js");
const {Person} = require("./models.js");
const Collection = require("./collection-class.js")
dotenv.config();

const DATABASE_URL =
  process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const foodModel = Food(sequelize, DataTypes);
const personModel = Person(sequelize, DataTypes);

const collectFood = new Collection(foodModel);
const collectPerson = new Collection(personModel);
module.exports = {
  db: sequelize,
  Users: users(sequelize, DataTypes),
  food: collectFood,
  person: collectPerson
};
