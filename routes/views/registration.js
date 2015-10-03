var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'post-registration';
    locals.filters = {
        post: req.params.post
    };
    locals.isSubmit = req.method == 'POST';

    // Load the current post
    view.on('init', function (next) {

        if (locals.isSubmit) {

            var q = keystone.list('Registration').model.findOne({
                author: locals.user._id
            });

            q.exec(function (err, result) {

                if (!result) {

                    var Registration = keystone.list('Registration');
                    var newRegistration = new Registration.model(req.body);

                    newRegistration.author = locals.user._id;
                    newRegistration.save(function (err, result) {
                        locals.title = result.title;
                    });
                } else {
                    locals.title = result.title;
                }
                next(err);

            });

        } else {

            var q = keystone.list('Post').model.findOne({
                _id: locals.filters.post
            }).populate('author');

            q.exec(function (err, result) {
                locals.title = result.title;
                locals.post = result;
                next(err);
            });
        }
    });

    // Render the view
    view.render('registration');

};
