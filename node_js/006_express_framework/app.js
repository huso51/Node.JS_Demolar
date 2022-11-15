const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const path = require('path');
const auth = require('./middleware/authentication');
const multer = require('multer');

//const mongoConnect = require('./utility/database').mongoConnect;
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views', './views');

const connectionString = 'mongodb+srv://huseyinaydin:kXU7ERUeRP16PHkZ@cluster0.mvw4o.mongodb.net/node-app?retryWrites=true&w=majority';

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const accountRoutes = require('./routes/account');

const errorController = require('./controllers/errors');
//const sequelize = require('./utility/database');

const User = require('./models/user');

/*const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Card = require('./models/card');
const CardItem = require('./models/cardItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage: storage
}).single('image'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
let store = new mongoDbStore({
    uri: connectionString,
    collection: 'mySessions'
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 //bir saat
    },
    store: store
}));
//app.use(auth);
app.use(csurf());


app.use((req, res, next) => {
    if(!req.session.user || req.session.isAuthentication===false){
        return next();
    }
    User.findById({_id: req.session.user._id})
        .then(user => {
            req.user = user;
            console.log(req.user);
            next();
        })
        .catch(err => {
            console.log(err);
        });
});


/*app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
});*/

// routes

app.use('/500', errorController.get500Page);
/*app.use((err, req, res, next)=>{
    res.status(500).render('error/500',{title: 'Sunucu hatası!'});
});*/

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);




//app.use(errorController.get404Page);

// Product.belongsTo(Category, { foreignKey: { allowNull: false } });
// Category.hasMany(Product);

// Product.belongsTo(User);
// User.hasMany(Product);

// User.hasOne(Card);
// Card.belongsTo(User);

// Card.belongsToMany(Product, { through: CardItem });
// Product.belongsToMany(Card, { through: CardItem });

// Order.belongsTo(User); //bir order'in bir user'i olacak moruk
// User.hasMany(Order) //bir user^'in birden fazla order'i olacah;

// Order.belongsToMany(Product, {through: OrderItem}); //burada bir sipariş içerisinde birden fazla ürün olabilir
// Product.belongsToMany(Order, {through: OrderItem}); //bir ürün birden fazla sipariş içerisinde de olabilir

// let _user;
// sequelize
//     //.sync({ force: true })
//     .sync()
//     .then(() => {

//         User.findByPk(1)
//             .then(user => {
//                 if (!user) {
//                     return User.create({ name: 'huseyinaydin', email: 'email@gmail.com' });
//                 }
//                 return user;
//             }).then(user => {
//                 _user = user;
//                 return user.getCard();
//             }).then(card => {
//                 if (!card) {
//                     return _user.createCard();
//                 }
//                 return card;
//             }).then(() => {
//                 Category.count()
//                     .then(count => {
//                         if (count === 0) {
//                             Category.bulkCreate([
//                                 { name: 'Telefon', description: 'telefon kategorisi' },
//                                 { name: 'Bilgisayar', description: 'bilgisayar kategorisi' },
//                                 { name: 'Elektronik', description: 'elektronik kategorisi' }
//                             ]);
//                         }
//                     });
//             });
//     })
//     .catch(err => {
//         console.log(err);
//     });

/*app.listen(3000, () => {
    console.log('3000. port dinleniyor!');
});*/

mongoose.connect(connectionString)
.then(() => {
    app.listen(3000,()=>{
        console.log('3000. port dinleniyor!');
    });
})
.catch(err => {
    console.log(err);
})