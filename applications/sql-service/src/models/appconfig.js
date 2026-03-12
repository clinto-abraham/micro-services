'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AppConfig extends Model {
    static associate(models) {
      // no relations yet
    }
  }

  AppConfig.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nameOfApp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      connectedBackendName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      connectedBackendPort: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'AppConfig',
      tableName: 'AppConfigs',
    }
  );

  return AppConfig;
};

