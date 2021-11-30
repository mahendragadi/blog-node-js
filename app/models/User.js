var  Sequelize = require('sequelize');
const sequelize = require('../../config/database/database');
const Post = require('./Post');

const tableName = 'users';
const User = sequelize.define('User',{
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    token: Sequelize.STRING,
    status: Sequelize.TINYINT,
},{tableName});


module.exports =  User;
