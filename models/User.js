var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
	autokey: { path: 'slug', from: '_id', unique: true }
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	nickname: { type: String },
	sex: { type: Types.Select, options: [1, 2, 0], default: 0 },
	city: { type: String },
	headimgurl: { type: Types.CloudinaryImage },
	mobile: { type: String },
	realname: { type: String },
	qqOpenid: { type: String },
	wechatOpenid: { type: String },
	wechatUnionid: { type: String },
	weiboOpenid: { type: String }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.defaultColumns = 'name, mobile, isAdmin';
User.register();
