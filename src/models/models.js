"use strict";

const Person = (sequelize, DataTypes) =>
  sequelize.define("person", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  });
  const Food = (sequelize, DataTypes) =>
  sequelize.define("food", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
  });

module.exports = {Person:Person,Food:Food}
