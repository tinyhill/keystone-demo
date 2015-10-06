var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'user';
    locals.filters = {};

    locals.title = '我';

    // Render the view
    view.render('user');

};