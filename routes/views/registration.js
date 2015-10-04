var keystone = require('keystone');

exports.new = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'registration/new';
    locals.filters = {
        post: req.params.post
    };
    locals.isSubmit = req.method == 'POST';

    // Load the current post
    view.on('init', function (next) {

        var postQ = keystone.list('Post').model.findOne({
            _id: locals.filters.post
        }).populate('author');

        postQ.exec(function (err, result) {

            locals.title = result.title;
            locals.post = result;

            if (locals.isSubmit) {

                var Registration = keystone.list('Registration');
                var registrationQ = Registration.model.findOne({
                    author: locals.user._id
                });

                registrationQ.exec(function (err, result) {

                    if (!result) {

                        var obj = new Registration.model(req.body);

                        obj.author = locals.user._id;
                        obj.save();
                    } else {
                        locals.isSubmited = true;
                    }
                    next(err);
                });
            } else {
                next(err);
            }
        });

    });

    // Render the view
    view.render('registration');

};

exports.info = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'registration/info';
    locals.filters = {
        post: req.params.post
    };

    // Load the current registration
    view.on('init', function (next) {

        var Registration = keystone.list('Registration');
        var registrationQ = Registration.model.findOne({
            post: locals.filters.post
        }).populate('author');

        registrationQ.exec(function (err, result) {
console.log(result);

            locals.layout = 'ajax';
            locals.registrations = result;
            next(err);
        });
    });

    // Render the view
    view.render('registration_info');
};

exports.users = function (req, res) {

    // todo
};