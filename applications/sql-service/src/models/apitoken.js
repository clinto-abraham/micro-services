// 'use strict';
// const {
//   Model
// } = require('sequelize');
// const { Sequelize, DataTypes } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   const ApiToken = sequelize.define(
//   'ApiToken',
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     tokenHash: {
//       type: DataTypes.STRING,
//     },
//     origin: {
//       type: DataTypes.STRING,
//     },
//     expiresAt: {
//       type: DataTypes.DATE,
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//     },
//   },
//   {
//     // Other model options go here
//   },
// );
// return ApiToken;
// };

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  console.log("sequelize instance in model:", !!sequelize);

  class ApiToken extends Model {
    static associate(models) {
      console.log(models, 46)
      // associations (if any) go here
      // e.g. ApiToken.belongsTo(models.User);
    }
  }

  ApiToken.init(
    {
      tokenHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      sequelize,              // 👈 required
      modelName: "ApiToken", // 👈 required
      tableName: "ApiTokens", // optional
      timestamps: true        // optional
    }
  );

  return ApiToken;
};


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ApiToken extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ApiToken.init({
//     tokenHash: DataTypes.STRING,
//     origin: DataTypes.STRING,
//     expiresAt: DataTypes.DATE,
//     isActive: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'ApiToken',
//   });
//   return ApiToken;
// };


