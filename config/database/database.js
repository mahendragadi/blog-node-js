const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database;

switch (process.env.NODE_ENV) {
  case 'production':
    database = getConnection('production');
    break;
  case 'testing':
    database = getConnection('testing');
    break;
  default:
    database =  getConnection('development');
}

function getConnection(type){
    return new Sequelize(
        connection[type].database,
        connection[type].username,
        connection[type].password, {
          host: connection[type].host,
          dialect: connection[type].dialect,
          pool: {
            max: 100000,
            min: 0,
            idle: 10000,
          },
        },
      )
}
module.exports = database;
