/*const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Category = sequelize.define('category',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
});*/

const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class Category {
    constructor(name, descripiton, id) {
        this.name = name;
        this.descripiton = descripiton;
        this._id = id ? new mongodb.ObjectID(id) : null;
    }

    save() {
        let db = getDb();
        if (this._id) {
            db = db.collection('categories').updateOne({ _id: this._id }, { $set: this });
        }
        else {
            db = db.collection('categories')
                .insertOne(this);
        }
        return db.then(result => {
            console.log(result);
        })
            .catch(err => {
                console.log(err);
            });
    }

    static findAll() {
        const db = getDb();
        return db.collection('categories')
            .find({})
            .toArray()
            .then(categories => {
                return categories;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(categoryId) {
        const db = getDb();
        return db.collection('categories')
            .findOne({ _id: mongodb.ObjectID(categoryId) })
            .then(category => {
                return category;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Category;