var keystone = require('keystone');
var async = require('async');

var services = {
    qq: require('../../lib/auth/qq'),
    wechat: require('../../lib/auth/wechat'),
    weibo: require('../../lib/auth/weibo')
};

exports = module.exports = function (req, res, next) {

    if (!req.params.service) {
        console.log('[auth.service] - You must define the service you wish to authenticate with.');
        return res.redirect('/signin');
    }

    if (req.query.target) {
        console.log('[auth.service] - Set target as [' + req.query.target + '].');
        res.cookie('target', req.query.target);
    }

    services[req.params.service].authenticateUser(req, res, next);

};
