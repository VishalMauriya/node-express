const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagepath: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;