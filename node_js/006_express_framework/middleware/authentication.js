module.exports = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        req.session.redirectTo = req.url;
        console.log('requesting ' + req.session.redirectTo + ' ' + req.url);
        return res.redirect('/login');
    }
    console.log('requesting ' + req.session.redirectTo + ' ' + req.url);
    next();
}