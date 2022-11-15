const mysql = require('../utility/database');

// const products = [
//     { id: '1234', name: 'Samsung S8', price: 4000, image: '1.jpg', description: 'Falan felan', categoryId: '1' },
//     { id: '1235', name: 'Samsung S7', price: 2500, image: '2.jpg', description: 'Falan felan', categoryId: '1' },
//     { id: '1236', name: 'Samsung S9', price: 4500, image: '3.jpg', description: 'Falan felan', categoryId: '1' },
//     { id: '1237', name: 'IPhone 8', price: 7000, image: '4.jpg', description: 'Falan felan', categoryId: '1' },
//     { id: '1238', name: 'Dizüstü bilgisayar', price: 10000, image: '6.jpg', description: 'Falan felan', categoryId: '2' },
//     { id: '1239', name: 'Buz dolabı', price: 15000, image: '5.jpg', description: 'Falan felan', categoryId: '3' }
// ];

module.exports = class Product {
    constructor(id, name, price, image, description, categoryId) {
        //this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.categoryId = categoryId;
    }

    saveProduct() {
        //products.push(this);
        return mysql.execute('insert into products(name, price, image, description, categoryId) values(?, ?, ?, ?, ?);',[this.name, this.price, this.image, this.description, this.categoryId]);
    }

    static getAll() {
        //return products;
        return mysql.execute('select * from products');
    }

    static getById(id) {
        /*const product = products.find(i => i.id === id);
        return product;*/
        return mysql.execute('select * from products where id=?',[id]);
    }

    static update(product) {
        /*const index = products.findIndex(i => i.id == product.id);
        products[index].name = product.name;
        products[index].price = product.price;
        products[index].image = product.image;
        products[index].description = product.description;
        products[index].categoryId = product.categaryId;*/
        console.log('hello ' + product.categoryId);
        return mysql.execute('update products set products.name=?, products.price=?, products.image=?, products.description=?, products.categoryId=? where products.id=?',[product.name, product.price, product.image, product.description,product.categoryId, product.id]);
    }

    static deleteById(id) {
        /*const index = products.findIndex(i => i.id == id);
        products.splice(index, 1);*/
        console.log('merhaba');
        console.log(id);
        return mysql.execute('delete from products where products.id=?',[id]);
    }

    static getProductsByCategoryId(categaryId){
        //return products.filter(i=>i.categoryId == categaryId);
    }
}