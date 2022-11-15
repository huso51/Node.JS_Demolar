const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Card = sequelize.define('card',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Card;