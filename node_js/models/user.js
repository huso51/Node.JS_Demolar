/*const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
    
});

module.exports = User;*/

const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class User{
    constructor(name, email, id){
        this.name = name;
        this.email = email;
        this._id = id;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new mongodb.ObjectID(userId) })
            .then(users => {
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByUserName(userName) {
        const db = getDb();
        return db.collection('users')
            .findOne({ name: userName })
            .then(users => {
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;