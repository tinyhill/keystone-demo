var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Registration Model
 * ==================
 */

var Registration = new keystone.List('Registration', {
    nocreate: true
});

Registration.add({
    post: { type: Types.Relationship, ref: 'Post', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    date: { type: Types.Date, default: Date.now, index: true },
    mobile: { type: String },
    realname: { type: String },
    content: { type: String },
    selected: { type: Boolean, index: true }
});

Registration.defaultColumns = 'post, author, date|20%';
Registration.register();
