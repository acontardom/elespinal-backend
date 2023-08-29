'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.MAsignation, {
        foreignKey: 'projectId',
        as: 'masignations',
        onDelete: 'cascade',
      });
      Project.hasMany(models.PAsignation, {
        foreignKey: 'projectId',
        as: 'pasignations',
        onDelete: 'cascade'
      });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    ubication: DataTypes.STRING,
    type: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};