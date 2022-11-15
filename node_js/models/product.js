/*const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Product;*/

const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(name, price, image, categories, description, id, userId) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.categories = categories;
        this.description = description;
        this._id = id ? new mongodb.ObjectID(id) : null; //id değeri varsa objeyi oluştur yoksa null ata
        this.userId = userId;
    }

    save() {
        let db = getDb();

        if (this._id) {
            db = db.collection('products')
                .updateOne({_id: this._id},{$set: this});
        }
        else{
            db = db.collection('products')
                .insertOne(this);
        }

        return db.then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    static deleteById(productId){
        const db = getDb();

        return db.collection('products').deleteOne({_id: new mongodb.ObjectID(productId)})
        .then(()=>{
            console.log('ürün silindi');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static findAll() {
        const db = getDb();
        return db.collection('products')
            .find({})
            .project({ name: 1, price: 1, image: 1 })
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(productId) {
        const db = getDb();
        /*return db.collection('products')
        .find({_id: new mongodb.ObjectID(productId)})
        .toArray()
        .then(products=>{
            return products;
        })
        .catch(err=>{
            console.log(err);
        })*/
        return db.collection('products')
            .findOne({ _id: new mongodb.ObjectID(productId) })
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = Product;