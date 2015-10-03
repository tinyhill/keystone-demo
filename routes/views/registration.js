var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'registration';
    locals.filters = {
        post: req.params.post
    };

    // Load the current post
    view.on('init', function (next) {

        var q = keystone.list('Registration').model.findOne({
            post: locals.filters.post
        });

        q.exec(function (err, result) {
            locals.registration = result;
            next(err);
        });

    });

    // Render the view
    view.render('registration');

};
