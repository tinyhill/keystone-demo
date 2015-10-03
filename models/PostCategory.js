var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { path: 'slug', from: '_id', unique: true }
});

PostCategory.add({
	name: { type: String, required: true }
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
