const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }
})

const Post = model('Post', postSchema);

module.exports = Post;