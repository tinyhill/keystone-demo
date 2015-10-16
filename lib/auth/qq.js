var _ = require('underscore');
var async = require('async');
var keystone = require('keystone');
var passport = require('passport');
var passportQQStrategy = require('passport-qq').Strategy;
var User = keystone.list('User');

var credentials = {
    clientID: process.env.QQ_CLIENT_ID,
    clientSecret: process.env.QQ_CLIENT_SECRET,
    callbackURL: process.env.QQ_CALLBACK_URL
};

exports.authenticateUser = function (req, res, next) {

    var self = this;
    var redirect = '/auth/confirm';

    if (req.cookies.target && req.cookies.target == 'app') redirect = '/auth/app';

    // Begin process
    console.log('============================================================');
    console.log('[services.qq] - Triggered authentication process...');
    console.log('------------------------------------------------------------');

    // Initalise QQ credentials
    var qqStrategy = new passportQQStrategy(credentials, function (accessToken, refreshToken, profile, done) {
        done(null, {
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile: profile
        });
    });

    // Pass through authentication to passport
    passport.use(qqStrategy);

    // Save user data once returning from QQ
    if (_.has(req.query, 'cb')) {

        console.log('[services.qq] - Callback workflow detected, attempting to process data...');
        console.log('------------------------------------------------------------');

        passport.authenticate('qq', {session: false}, function (err, data, info) {

            if (err || !data) {
                console.log("[services.qq] - Error retrieving QQ account data - " + JSON.stringify(err));
                return res.redirect('/signin');
            }

            console.log('[services.qq] - Successfully retrieved QQ account data, processing...');
            console.log('------------------------------------------------------------');

            var name = data.profile && data.profile.displayName ? data.profile.displayName.split(' ') : [];

            var auth = {
                type: 'qq',

                name: {
                    first: name.length ? name[0] : '',
                    last: name.length > 1 ? name[1] : ''
                },

                website: data.profile._json.blog,

                profileId: data.profile.id,

                username: data.profile.username,
                avatar: data.profile._json.avatar_url,

                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            };

            // QQ Specific: Retrieve email address
            self.getEmails(auth.accessToken, function (err, email) {
                if (!err && email) auth.email = email;
                req.session.auth = auth;
                return res.redirect(redirect);
            });

        })(req, res, next);

        // Perform inital authentication request to GitHub
    } else {

        console.log('[services.qq] - Authentication workflow detected, attempting to request access...');
        console.log('------------------------------------------------------------');

        passport.authenticate('qq', {scope: ['user:email']})(req, res, next);

    }

};