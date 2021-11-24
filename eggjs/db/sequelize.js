'use strict';

const { Sequelize } = require('sequelize');

const { mysql } = require('../config/mysql.config');

async function linkSql() {
  const sequelize = new Sequelize(mysql.client.database, mysql.client.user, mysql.client.password, {
    host: mysql.host,
    dialect: mysql.name,
    dialectOptions: {
      multipleStatements: true,
    },
    timezone: '+08:00',
    timestamps: false,
  });
  try {
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    // console.error('Unable to connect to the database:', error);
    throw error;
  }
  return sequelize;
}
module.exports = {
  sequelize: linkSql,
};
