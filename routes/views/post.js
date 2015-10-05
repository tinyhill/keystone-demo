var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'post';
    locals.filters = {
        post: req.params.post
    };

    // Load the current post
    view.on('init', function (next) {

        var postId = locals.filters.post;
        var postQuery = keystone.list('Post').model.findOne({
            _id: postId
        });

        postQuery.exec(function (err, post) {

            var postType = post.type;

            post.content = post.content.replace(/<img(.+)src=/i, '<img$1data-src=');

            locals.back = '/category/' + post.categories[0];
            locals.title = post.title;
            locals.isArticle = postType == 'article';
            locals.isProduct = postType == 'product';
            locals.isRegistration = postType == 'registration';
            locals.isPublished = post.state == 'published';
            locals.post = post;

            var registrationModel = keystone.list('Registration').model;
            var registrationQuery = registrationModel.find({
                post: postId
            }).limit(6).populate('author');

            registrationQuery.exec(function (err, registration) {

                locals.registration = registration;

                var countQuery = registrationModel.count(function (err, count) {

                    locals.registration.count = count;

                    countQuery.count({
                        selected: true
                    }, function (err, count) {

                        locals.registration.selectedCount = count;
                        next(err);
                    });
                });
            });
        });
    });

    // Render the view
    view.render('post');

};
