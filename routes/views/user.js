var keystone = require('keystone');

exports.home = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'user';
    locals.filters = {};

    locals.title = '我';

    // Render the view
    view.render('user');

};

exports.registrations = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'user_registrations';
    locals.filters = {};

    locals.back = '/user';
    locals.title = '我的报名';

    // Render the view
    view.render('user_registrations');
};