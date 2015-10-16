var keystone = require('keystone');

exports.index = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'user';
    locals.title = '我';

    // Render the view
    view.render('user');

};

exports.profile = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'user_profile';
    locals.isSubmit = req.method == 'POST';

    // Load the current post
    view.on('init', function (next) {

        locals.back = '/user';
        locals.title = '编辑资料';

        if (locals.isSubmit) {

            var userId = locals.user._id;
            var userModel = keystone.list('User').model;

            userModel.update({
                _id: userId
            }, req.body, function (err, numAffected) {

                var userQuery = userModel.findOne({
                    _id: userId
                });

                userQuery.exec(function (err, user) {
                    locals.user = user;
                    next(err);
                });
            });
        } else {
            next();
        }
    });

    // Render the view
    view.render('user_profile');

};

exports.registrations = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'user_registrations';
    locals.filters = {
        page: req.query.page,
        selected: req.query.selected
    };

    // Load the current post
    view.on('init', function (next) {

        locals.back = '/user';
        locals.title = '我的报名';
        locals.isAjax = typeof locals.filters.page !== 'undefined';
        locals.isSelected = typeof locals.filters.selected !== 'undefined';

        var registrationList = keystone.list('Registration');
        var registrationQuery = registrationList.paginate({
            page: locals.filters.page || 1,
            perPage: 5
        }).where('author', locals.user._id)
            .populate('post');

        if (locals.isSelected) {
            registrationQuery.where('selected', true);
        }

        registrationQuery.exec(function (err, registrations) {
            if (locals.isAjax) {
                locals.layout = 'ajax';
            }
            locals.registrations = registrations.results;
            next(err);
        });
    });

    // Render the view
    view.render('user_registrations');

};