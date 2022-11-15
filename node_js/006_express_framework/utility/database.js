/*const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node-app',
    password: 'toor'
});

module.exports = connection.promise();*/

/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-app','root','toor',{
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;*/

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    
    MongoClient.connect('mongodb+srv://huseyinaydin:kXU7ERUeRP16PHkZ@cluster0.mvw4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    //MongoClient.connect('mongodb://localhost/node-app')
    .then(client=>{
        console.log('bağlantı başarılı mongodb');
        
        _db = client.db();
        callback();
        console.log('burası 02');
    })
    .catch(err=>{
        console.log(err);
        //throw err;
    })

}

const getDb = ()=>{
    if(_db)
        return _db;
    throw 'veritabanı yok';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;