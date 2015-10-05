var keystone = require('keystone');

exports.new = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'registration_new';
    locals.filters = {
        post: req.params.post
    };
    locals.isSubmit = req.method == 'POST';

    // Load the current post
    view.on('init', function (next) {

        var postId = locals.filters.post;
        var postQuery = keystone.list('Post').model.findOne({
            _id: postId
        }).populate('author');

        postQuery.exec(function (err, post) {

            locals.back = '/post/' + postId;
            locals.title = post.title;
            locals.post = post;

            if (locals.isSubmit) {

                var userId = locals.user._id;
                var registrationList = keystone.list('Registration');
                var registrationQuery = Registration.model.findOne({
                    author: userId
                });

                registrationQuery.exec(function (err, registration) {

                    if (!registration) {

                        var obj = new registrationList.model(req.body);

                        obj.author = userId;
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
    view.render('registration_new');

};

exports.users = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'registration_users';
    locals.filters = {
        post: req.params.post,
        page: req.query.page,
        selected: req.query.selected
    };

    // Load the current post
    view.on('init', function (next) {

        var postId = locals.filters.post;

        locals.back = '/post/' + postId;
        locals.title = '报名统计';
        locals.isAjax = typeof locals.filters.page !== 'undefined';
        locals.isSelected = typeof locals.filters.selected !== 'undefined';

        var registrationList = keystone.list('Registration');
        var registrationQuery = registrationList.paginate({
            page: locals.filters.page || 1,
            perPage: 5
        }).where('post', postId);

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
    view.render('registration_users');
};