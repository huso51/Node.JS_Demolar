const User = require('../models/user');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto');
const Login = require('../models/login');

sgMail.setApiKey('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');

exports.getLogin = (req, res, next) => {
    let errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/login', {
        path: '/login',
        title: 'Login',
        errorMessage: errorMessage
    });
}

exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const loginModel = new Login({
        email: email,
        password: password
    });
    loginModel.validate()
        .then(() => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        req.session.errorMessage = 'Bu mail adresi ile bir kayıt bulunamamıştır.';
                        req.session.save(err => {
                            console.log(err);
                            return res.redirect('/login');
                        });
                    }

                    bcrypt.compare(password, user.password)
                        .then(isSuccess => {
                            if (isSuccess) {
                                req.session.user = user;
                                req.session.isAuthenticated = true;
                                return req.session.save(function (err) {
                                    var url = req.session.redirectTo || '/';
                                    delete req.session.redirectTo;
                                    return res.redirect(url);
                                });
                            }
                            req.session.errorMessage = 'Hatalı e-posta yada parola girdiniz!';
                            req.session.save(err => {
                                return res.redirect('/login');
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render('account/login', {
                    path: '/login',
                    title: 'Login',
                    errorMessage: message
                });
            }
            else
                next(err);
        });
}

exports.getRegister = (req, res, next) => {
    let errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/register', {
        path: '/register',
        title: 'Register',
        errorMessage: errorMessage
    });
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                req.session.errorMessage = 'Bu mail adresi ile daha önce kayıt olunmuş.';
                req.session.save(err => {
                    console.log(err);
                    return res.redirect('/register');
                });
            }

            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {
            console.log(hashedPassword);

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return newUser.save();
        })
        .then(() => {

            const msg = {
                to: email, // Change to your recipient
                from: 'hhuseyin.aydin.51@gmail.com', // Change to your verified sender
                subject: 'Hesap oluşturuldu!',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>Hesabınız başarılı bir şekilde oluşturuldu!</strong>',
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('email gönderildi!')
                })
                .catch((error) => {
                    console.error(error)
                });
            res.redirect('/login');

        }).catch(err => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render('account/register', {
                    path: '/register',
                    title: 'Register',
                    errorMessage: message
                });
            }
            else
                next(err);
        })
}

exports.getReset = (req, res, next) => {
    let errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/reset', {
        path: '/reset-password',
        title: 'Reset password',
        errorMessage: errorMessage
    });
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');
        console.log(token);

        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    req.session.errorMessage = 'Mail adresi bulunamadı!';
                    req.session.save(err => {
                        console.log(err);
                        return res.redirect('/reset-password');
                    });
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {

                const msg = {
                    to: email, // Change to your recipient
                    from: 'hhuseyin.aydin.51@gmail.com', // Change to your verified sender
                    subject: 'Parola Reset!',
                    text: 'Parolanızı güncellemek için aşağıdaki linke tıklayınız.',
                    html: `
                        <p>Parolanızı güncellemek için aşağıdaki linke tıklayınız.</p>     
                        <p>
                            <a href="http://localhost:3000/reset-password/${token}">Parola Sıfırla</a>
                        </p>               
                    `
                }
                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('email gönderildi!')
                    })
                    .catch((error) => {
                        console.error(error)
                    });
                res.redirect('/');
            })
            .catch(err => {
                next(err);
            })
    })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({
        resetToken: token, resetTokenExpiration: {
            $gt: Date.now()
        }
    }).then(user => {

        res.render('account/new-password', {
            path: '/new-password',
            title: 'New password',
            userId: user._id.toString(),
            passwordToken: token
        });
    }).catch(err => {
        next(err);
    })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.passwordToken;
    const userId = req.body.userId;
    console.log('hüseyin ' + newPassword + ' ' + token + ' ' + userId);
    let _user;
    User.findOne({
        resetToken: token, resetTokenExpiration: {
            $gt: Date.now()
        },
        _id: userId
    }).then(user => {
        _user = user;
        return bcrypt.hash(newPassword, 12);
    }).then(hashedPassword => {
        console.log('hashed password ' + hashedPassword);
        _user.password = hashedPassword;
        console.log('password ' + _user.password);
        _user.resetToken = undefined;
        _user.resetTokenExpiration = undefined;
        _user.save();
    }).then(() => {
        res.redirect('/login');
    })
        .catch(err => {
            next(err);
        })
}

