'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MAsignation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MAsignation.belongsTo(models.Equipment, {
        foreignKey: 'EquipmentId',
        as: 'equipment'
      });
      MAsignation.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      });

    }
  }
  MAsignation.init({
    init_date: DataTypes.DATEONLY,
    finish_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'MAsignation',
  });
  return MAsignation;
};