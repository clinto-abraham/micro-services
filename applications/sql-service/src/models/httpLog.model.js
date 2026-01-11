'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HttpLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Optional future associations:
      // HttpLog.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  HttpLog.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      service: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Micro-service name (e.g. sql-microservice)'
      },

      method: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: 'HTTP method'
      },

      path: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Request path'
      },

      statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'HTTP response status'
      },

      responseTimeMs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Response time in milliseconds'
      },

      requestBody: {
        type: DataTypes.JSONB,
        allowNull: true,
        comment: 'Sanitized request body'
      },

      headers: {
        type: DataTypes.JSONB,
        allowNull: true,
        comment: 'Whitelisted request headers'
      },

      error: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Error message if request failed'
      }
    },
    {
      sequelize,
      modelName: 'HttpLog',
      tableName: 'http_logs',
      timestamps: true,
      updatedAt: false, // logs are immutable
      indexes: [
        {
          fields: ['service', 'createdAt']
        },
        {
          fields: ['statusCode']
        }
      ]
    }
  );

  return HttpLog;
};
