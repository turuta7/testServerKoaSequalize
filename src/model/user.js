const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('user', {
  login: Sequelize.STRING,
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  eMail: Sequelize.STRING,
});

module.exports = User;
