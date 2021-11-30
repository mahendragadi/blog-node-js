var  Sequelize = require('sequelize');
const sequelize = require('../../config/database/database');
const User = require('./User');

const tableName = 'posts'
const Post = sequelize.define('Post', {
    id:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    user_id: Sequelize.BIGINT,
    status: Sequelize.TINYINT,

},{tableName});



module.exports = Post