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

        var q = keystone.list('Post').model.findOne({
            _id: locals.filters.post
        }).populate('author categories');

        q.exec(function (err, result) {

            var type = result.type;

            locals.title = result.title;
            locals.isArticle = type == 'article';
            locals.isProduct = type == 'product';
            locals.isRegistration = type == 'registration';
            locals.isPublished = result.state == 'published';
            locals.post = result;
            next(err);
        });
    });

    // Render the view
    view.render('post');

};
