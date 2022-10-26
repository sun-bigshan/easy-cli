# easy-cli

初始化项目命令：`easy-cli init`

```js
// /models/Account.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');
const Account = sequelize.define(
  'Account',
  {
    // 在这⾥定义模型属性
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '名字',
    },
    age: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '年龄',
    },
    hobby: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '爱好',
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间',
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'account',
    timestamps: false,
    // 其他模型参数
  }
);
(async () => {
  await Account.sync({ alter: true });
  console.log('成功同步');
})();
module.exports = Account;

```
