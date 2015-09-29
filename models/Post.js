var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	type: { type: Types.Select, options: 'article, product, registration', default: 'article', index: true },
	images: { type: Types.CloudinaryImages, dependsOn: { type: ['product', 'registration'] } },
	time: { type: String, dependsOn: { type: ['product', 'registration'] } },
	location: { type: String, dependsOn: { type: ['product', 'registration'] } },
	contact: { type: String, dependsOn: { type: ['product', 'registration'] } },
	cost: { type: Number, dependsOn: { type: ['product'] } },
	limit: { type: Number, dependsOn: { type: ['registration'] } }
	// products: { type: Types.Relationship, ref: 'Product', many: true, dependsOn: { type: ['product'] } }
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
