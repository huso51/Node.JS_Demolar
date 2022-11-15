/*
const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(name, price, description, image, categories, id, userId) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.categories = (categories && !Array.isArray(categories)) ? Array.of(categories) : categories;
        this._id = id ? new mongodb.ObjectID(id) : null;
        this.userId = userId;
    }

    save() {
        let db = getDb();

        if (this._id) {
            db = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        } else {
            db = db.collection('products').insertOne(this);
        }

        return db
            .then(result => {
                console.log(result);
            })
            .catch(err => { console.log(err) });
    }

    static findAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .project({ description: 0 })
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(productid) {
        const db = getDb();
        return db.collection('products').
            findOne({ _id: new mongodb.ObjectID(productid) })
            .then(product => {
                return product;
            }).catch(err => {
                console.log(err);
            });
    }

    static deleteById(productid) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: new mongodb.ObjectID(productid) })
            .then(() => {
                console.log('deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findByCategoryId(categoryId) {
        const db = getDb();
        return db.collection('products')
            .find({categories: categoryId})
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => { console.log(err); });
    }

}

module.exports = Product;
*/

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'ürün ismi girmelisiniz'],
        minlength: [5, 'ürün ismi için minimum 5 karakter girmelisiniz.'],
        maxlength: [255, 'ürün ismi için maksimum 255 karakter girmelisiniz.'],
        lowercase: true,
        // uppercase: true
        trim: true
    },
    price: {
        type: Number,
        required: function () {
            return this.isActive;
        },
        min: 0,
        max: 10000,
        get: value => Math.round(value), //10.2 => 10 10.8=> 11
        set: value => Math.round(value)  // 10.2 => 10 10.8=>11
    },
    description: {
        type: String,
        minlength: 10
    },
    image: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value && value.length > 0;
            },
            message: 'ürün için en az bir etiket giriniz'
        }
    },
    isActive: Boolean,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: false
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);