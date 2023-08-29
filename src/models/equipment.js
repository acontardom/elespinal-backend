'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipment.hasMany(models.MAsignation, {
        foreignKey: 'EquipmentId',
        as: 'masignations',
        onDelete: 'cascade',
      });
    }
  }
  Equipment.init({
    patent: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    type: DataTypes.STRING,
    km: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};