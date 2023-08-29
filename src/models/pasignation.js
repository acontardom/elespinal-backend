'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PAsignation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PAsignation.belongsTo(models.People, {
        foreignKey: 'PeopleId',
        as: 'people'
      });
      PAsignation.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      });
      
    }
  }
  PAsignation.init({
    init_date: DataTypes.DATEONLY,
    finish_date: DataTypes.DATEONLY
    
  }, {
    sequelize,
    modelName: 'PAsignation',
  });
  return PAsignation;
};