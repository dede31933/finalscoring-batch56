// models/type.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      // define association here
    }
  }
  Type.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'type_tb'
  });
  return Type;
};
