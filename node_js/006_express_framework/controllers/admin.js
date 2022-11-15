const Product = require('../models/product');
const Category = require('../models/category');
const fs = require('fs');

exports.getProducts = (req, res, next) => {
    Product
        .find({ userId: req.user._id })
        .populate('userId', 'name image -_id')
        .select('name image price userId')
        // .find({ name: 'IPhone 6', price: 2000 })
        // .limit(10)
        // .sort({ name: 1 })
        // .select({ name: 1, price: 1 })
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            next(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    const name = '';
    const price = '';
    const image = '';
    const description = '';
    res.render('admin/add-product', {
        title: 'New Product',
        path: '/admin/add-product',
        inputs: {
            name: name,
            price: price,
            image: image,
            description: description
        }
    });
}

exports.postAddProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file;
    const description = req.body.description;
    console.log(file);
    console.log('dede ' + file.filename);

    if (!image) {
        res.render('admin/add-product', {
            title: 'New Product',
            path: '/admin/add-product',
            inputs: {
                name: name,
                price: price,
                image: image,
                description: description,
                errorMessage: 'Lütfen bir resim seçiniz!'
            }
        });
    }
    const product = new Product({
        name: name,
        price: price,
        image: image.filename,
        description: description,
        userId: req.user,
        isActive: false,
        tags: ['akıllı telefon']
    });

    product.save()
        .then(() => {
            res.redirect('/admin/products');
        }).catch(err => {

            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render('admin/add-product', {
                    title: 'New Product',
                    path: '/admin/add-product',
                    errorMessage: message,
                    inputs: {
                        name: name,
                        price: price,
                        image: image.filename,
                        description: description
                    }
                });
            }
            else {
                /*res.status(500).render('admin/add-product', {
                    title: 'New Product',
                    path: '/admin/add-product',
                    errorMessage: 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyiniz.',
                    inputs: {
                        name: name,
                        price: price,
                        image: image,
                        description: description
                    }
                });*/
                //res.redirect('/');
                //res.redirect('/500');
                next(err);
            }
        });

}

exports.getEditProduct = (req, res, next) => {
    console.log('konsola log ' + req.user._id);
    Product.findOne({ _id: req.params.productid, userId: req.user._id })
        //.populate('categories')
        .then(product => {
            if (!product) {
                console.log('ana saifeye yönlendirildi!');
                return res.redirect('/');
            }
            return product;
        })
        .then(product => {
            Category.find()
                .then(categories => {
                    categories.map(category => {
                        if (product.categories) {
                            product.categories.find(item => {
                                if (item.toString() === category._id.toString()) {
                                    category.selected = true;
                                }
                            })
                        }
                        return category;
                    })
                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories
                    });
                })

        })
        .catch(err => {
            console.log(err);
        });

}

exports.postEditProduct = (req, res, next) => {
    // query first
    // update first

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file;
    const description = req.body.description;
    const ids = req.body.categoryids;

    const product = {
        name: name,
        price: price,
        description: description,
        categories: ids
    }
    if (image) {
        product.image = image.filename;
    }

    Product.findOne({ _id: id, userId: req.user._id })
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            product.name = name;
            product.price = price;
            product.description = description;
            product.categories = ids;

            if (image) {
                fs.unlink('public/img/' + product.image, err => {
                    if (err)
                        console.log(err);

                })
                product.image = image.filename;
            }
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => next(err));


    /*
    Product.findById(id)
        .then(product => {
            product.name = name;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description
            return product.save()
        })
        .then(() => {
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => console.log(err));
        */
}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productId;
    console.log('burası hopppa');

    Product.findOne({ _id: id, userId: req.user._id })
        .then(product => {
            if (!product) {
                return next(new Error('Silinmek istenen ürün bulunamadı!'));
            }
            fs.unlink('public/img/' + product.image, err => {
                if (err)
                    console.log(err);
            });
            Product.deleteOne({ _id: id, userId: req.user._id })
                .then((result) => {
                    if (result.deletedCount === 0) {
                        return next(new Error('Silinmek istenen ürün bulunamadı!'));
                    }
                    console.log('product has been deleted.');
                    res.redirect('/admin/products?action=delete');
                })
                .catch(err => {
                    console.log(err);
                    //next(err);
                });
        })


}


exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category'
    });
}


exports.postAddCategory = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;

    const category = new Category({
        name: name,
        description: description
    });

    category.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/categories?action=create');
        })
        .catch(err => next(err));
}

exports.getCategories = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action
            });
        }).catch(err => next(err));
}


exports.getEditCategory = (req, res, next) => {
    console.log('loga log ' + req.params.categoryid);
    Category.findById({ _id: req.params.categoryid })
        .then(category => {
            console.log('kategori then lo');
            res.render('admin/edit-category', {
                title: 'Edit Category',
                path: '/admin/categories',
                category: category
            });
            if (category) {
                console.log('kategori var lo');
            }
        })
        .catch(err => console.log(err));
}

exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    Category.findById({ _id: id })
        .then(category => {
            category.name = name,
                category.description = description
            return category.save();
        })
        .then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch(err => next(err));
}

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;
    Category.findByIdAndRemove({ _id: id })
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch(err => {
            next(err);
        });
}
