const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Hero extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, if Hero belongs to User:
      // Hero.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Hero.init({
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'heroes_tb',
    timestamps: true,
  });

  return Hero;
};
