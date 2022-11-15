const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');


module.exports.getIndex = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    /*Product.findAll({attribute: ['id','name','price','image']})
        .then((products)=>{
            Category.findAll()
            .then(categories=>{
                res.render('shop/index',{title: 'Shopping', products: products, categories: categories, path: '/'});
            })
            .catch(err=>{
                console.log(err);
            })
            
        })
        .catch((err)=>{
            console.log(err);
        });*/
    Product.find()
        .then(products => {
            return products;
        })
        .then(products => {
            //res.render('shop/index', { title: 'Shopping', products: products, path: '/' });
            Category.find()
                .then(categories => {
                    res.render('shop/index', { title: 'Shopping', products: products, categories: categories, path: '/' });
                })
                .catch(err => {
                    next(err);
                });
        })
        .catch(err => {
            next(err);
        })

};

module.exports.getProducts = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));

    /* Product.findAll({attribute: ['id','name','price','image']})
         .then((products)=>{
             Category.findAll()
             .then(categories=>{
                 res.render('shop/products',{title: 'Products', products: products,categories: categories, path: '/products'});
             })
             .catch(err=>{
                 console.log(err);
             })
             
         })
         .catch((err)=>{
             console.log(err);
         });*/
    Product.find()
        // .find({ price: { $eq: 2000 } }) //pricesi 2000 olanı getir
        // .find({ price: { $ne: 2000 } }) //pricesi 2000 olmayanları getir
        // .find({ price: { $gt: 2000 } })  //pricesi 2000den büyük olan kayıtları getir
        // .find({ price: { $gte: 2000 } }) //pricesi 2000den büyük veya eşit olanları getir
        // .find({ price: { $lt: 2000 } }) //pricesi 2000den küçük olan kayıtları getir
        // .find({ price: { $lte: 2000 } }) //pricesi 2000den küçük veya eşit kayıtları getir
        // .find({ price: { $in: [1000,2000,3000] } }) //pricesi 1000 2000 3000 olan kayıtları getir
        // .find({ price: { $gte: 1000, $lte: 2000 } }) //1000den büyük veya eşit 2000den küçük veya eşit kayıtları getir
        // .find([{ price: { $gt: 2000 }, name: 'Samsung S6' }]) //pricesi 2000den büyük ve namesi samsung s6 olan kayıtları getir
        // .or([{ price: { $gt: 2000 }, name: 'Samsung S6' }]) //pricesi 2000den büyük veya namesi samsung s6 olan kayıtları getir
        // .find({name: /^Samsung/}) //başı samsung olan kayıtları getirir
        // .find({name: /Samsung$/}) //sonu samsung olan kayıtları getirir
        // .find({name: /.*Samsung.*/}) //içinde samsung geçen kayıtları getirir
        .then(products => {
            //res.render('shop/products', { title: 'Products', products: products, path: '/products' });
            return products;
        })
        .then(products => {
            Category.find()
                .then(categories => {
                    res.render('shop/products', { title: 'Products', products: products, categories: categories, path: '/products' });
                })
                .catch(err => {
                    next(err);
                });
        })
        .catch(err => {
            next(err);
        });
};

module.exports.getProductsByCategoryId = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    const categoryId = req.params.categoryid;
    //const products = Product.getProductsByCategoryId(categoryId);
    //const categories = Category.getAll();
    const model = [];
    Category.find()
        .then(categories => {
            model.categories = categories;
            return Product.find({
                categories: categoryId
            });
        })
        .then(products => {
            res.render('shop/products', { title: 'Ana sayfa', products: products, categories: model.categories, selectedCategory: categoryId, path: '/products' });
        })
        .catch(err => {
            next(err);
        })
};

module.exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    // const product = Product.getById(productId);
    /*Product.findAll(
        
        {attribute: ['id','name','price','image','descripiton'],where: {id: productId}})
    .then(products=>{
        res.render('shop/product-detail',{title: products[0].name,product: products[0], path: '/products'});
    })
    .catch(err=>{
        console.log(err);
    });*/

    Product.findOne({ _id: productId })
        .then(product => {
            res.render('shop/product-detail', { title: product.name, product: product, path: '/products' });
        })
        .catch(err => {
            next(err);
        });

    /*Product.findByPk(productId)
        .then(product=>{
            res.render('shop/product-detail',{title: product.name,product: product, path: '/products'});
        })
        .catch(err=>{
            console.log(err);
        });*/
};

module.exports.getProductDetails = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    const products = Product.getAll();
    res.render('shop/details', { title: 'Ana sayfa', products: products, path: '/details' });
};

module.exports.getCard = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    console.log('get card aydın');
    req.user.populate('cart.items.productId')//user tablosu üzerinden populate metodu aracılığıyla productId'si üzerinden kullanıcının cart itemlerini çektik
        .execPopulate()
        .then(user => {
            res.render('shop/card', { title: 'Ana sayfa', products: user.cart.items, path: '/card' });
        })
        .catch(err => {
            next(err);
        });

};

module.exports.postCard = (req, res, next) => {
    const productId = req.body.productId;
    console.log('product id ' + productId);
    Product.findById(productId)
        .then(product => {
            //console.log(product.cart)
            return req.user.addToCard(product);
        })
        .then(() => {
            res.redirect('/card');
        })
        .catch(err => {
            next(err);
        })
}

module.exports.postCardItemDelete = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    const productId = req.body.productId;
    req.user
        .deleteCardItem(productId)
        .then(() => {
            res.redirect('/card');
        })
        .catch(err => {
            next(err);
        })
    //res.render('shop/orders',{title: 'Ana sayfa', products: products, path: '/orders'});
};

module.exports.getOrders = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    //const products = Product.getAll();
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            console.log(orders);
            res.render('shop/orders', { title: 'Ana sayfa', orders: orders, path: '/orders' });
        })
        .catch(err => {
            next(err);
        })

};

module.exports.postOrder = (req, res) => {
    //console.log('loglama yapıldı!');
    //res.sendFile(path.join(__dirname,'../','views', 'index.html'));
    /*let userCard;
    req.user.getCard()
        .then(card => {
            userCard = card;
            return card.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    order.addProduct(products.map(product => {
                        product.orderItem = {
                            quantity: product.cardItem.quantity,
                            price: product.price
                        }
                        return product;
                    }));

                })
                .catch(err => {
                    console.log(err);
                })
        })
        .then(() => {
            userCard.setProducts(null);
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        })*/
    /*const products = Product.getAll();
    res.render('shop/orders',{title: 'Ana sayfa', products: products, path: '/orders'});*/


    req.user.populate('cart.items.productId')//user tablosu üzerinden populate metodu aracılığıyla productId'si üzerinden kullanıcının cart itemlerini çektik
        .execPopulate()
        .then(user => {
            const order = new Order({
                user: {
                    userId: req.user._id,
                    name: req.user.name,
                    email: req.user.email
                },
                items: user.cart.items.map(p => {
                    return {
                        product: {
                            _id: p.productId._id,
                            name: p.productId.name,
                            price: p.productId.price,
                            image: p.productId.image
                        },
                        quantity: p.quantity
                    }
                })
            });
            console.log('save çalıştı');
            return order.save();

        })
        .then(() => {
            //cart temizle
            console.log('clear çalıştı');
            return req.user.clearCard();
        })
        .then(() => {
            console.log('redirect çalıştı');
            res.redirect('/orders');
        })
        .catch(err => {
            next(err);
        });
};










/*module.exports.getAddProduct = (req,res,next)=>{
    res.render('add-product',{title:'Yeni ürün ekle', path: '/admin/add-product'});
};

module.exports.postAddProduct = (req,res,next)=>{
    //products.push({name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description});
    console.log(req.body);
    const product = new Product(req.body.name, req.body.price, req.body.image, req.body.description);
    product.saveProduct();
    res.redirect('/');
};*/