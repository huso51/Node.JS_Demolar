/*const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(name, email,card, id) {
        this.name = name;
        this.email = email;
        this.card = card ? card: {};
        this.card.items = card ? card.items : []; //card varsa card item'i ata yohsa diziyi ata
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this);
    }

    getCard(){
        const ids = this.card.items.map(i=>{
            return i.productId;
        });
        const db = getDb();
        return db.collection('products')
            .find({_id: {$in: ids}})
            .toArray()
            .then(products=>{
                return products.map(p=>{
                    return {
                        ...p,
                        quantity: this.card.items.find(i=>{
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    addToCard(product){
        let index = -1;
        if(this.card){
            index = this.card.items.findIndex(cp=>{
                return cp.productId.toString() === product._id.toString();
            });
        }
        
        const updatedCardItems = [...this.card.items];
        let itemQuantity = 1;
        if(index >= 0){
            itemQuantity = this.card.items[index].quantity + 1;
            updatedCardItems[index].quantity = itemQuantity;
        }
        else{
            updatedCardItems.push({
                productId: new mongodb.ObjectID(product._id),
                quantity: itemQuantity
            });

        }
        const db = getDb();
        return db.collection('users')
            .updateOne({_id: new mongodb.ObjectID(this._id)},{$set: {
                card: {
                    items: updatedCardItems
                }
            }});
    }

    deleteCardItem(productId){
        const cardItems = this.card.items.filter(i=>{
            return i.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db.collection('users')
            .updateOne({_id: new mongodb.ObjectID(this._id)},{$set: {card:{
                items: cardItems
            }}});
    }

    static findById(userid) {

        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new mongodb.ObjectID(userid) })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findByUserName(username) {

        const db = getDb();
        return db.collection('users')
            .findOne({ name: username })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }

    addOrder(){
        const db = getDb();
        return this.getCard()
            .then(products=>{
                const order = {
                    items: products.map(p=>{
                        return {
                            _id: p._id,
                            name: p.name,
                            price: p.price,
                            image: p.image,
                            description: p.description,
                            userId: p.userId,
                            quantity: p.quantity
                        };
                    }),
                    user:{
                        _id: new mongodb.ObjectID(this._id),
                        name: this.name,
                        email: this.email
                    },
                    date: new Date().toLocaleDateString()
                };
                return db.collection('orders')
                    .insertOne(order);
            })
            .then(()=>{
                this.card = {
                    items: []
                };
                return db.collection('users')
                    .updateOne({_id: new mongodb.ObjectID(this._id)},{$set: {card: {items: []}}});
            })
    }

    getOrders(){
        const db = getDb();
        return db.collection('orders')
            .find({'user._id': new mongodb.ObjectID(this._id)})
            .toArray();
    }


}


module.exports = User;
*/
const mongoose = require('mongoose');
const Product = require('./product');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});
userSchema.methods.addToCard = function (product) {
    const index = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    });

    const updatedCartItems = [...this.cart.items];

    let itemQuantity = 1;
    if (index >= 0) {
        // cart zaten eklenmek istenen product var: quantity'i arttır
        itemQuantity = this.cart.items[index].quantity + 1;
        updatedCartItems[index].quantity = itemQuantity;

    } else {
        // updatedCartItems!a yeni bir eleman ekle
        updatedCartItems.push({
            productId: product._id,
            quantity: itemQuantity
        });
    }

    this.cart = {
        items: updatedCartItems
    }

    return this.save();
}

userSchema.methods.getCard = function () {
    const ids = this.cart.items.map(i=>{
        return i.productId;
    });
   
    return Product.find({_id: {$in: ids}})
        .select('name price image')
        .then(products=>{
            return products.map(p=>{
                return {
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    quantity: this.cart.items.find(i=>{
                        return i.productId.toString() === p._id.toString()
                    }).quantity
                }
            })
        })
        .catch(err=>{
            console.log(err);
        })
}

userSchema.methods.deleteCardItem = function (productId) {
    const cardItems = this.cart.items.filter(i=>{
        return i.productId.toString() !== productId.toString();
    });

    this.cart.items = cardItems;
    return this.save();
}

userSchema.methods.clearCard = function () {
    this.cart = {items:[]};
    this.save();
}

module.exports = mongoose.model('User', userSchema);