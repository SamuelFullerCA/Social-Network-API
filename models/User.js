const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trimmed: true},
    email: {type: String, required: true, unique: true}, //needs to be valid email? regex?
    thoughts, //link to thoughts?
    friends, //link to other users?
});

const User = mongoose.model('User', userSchema)

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.






module.exports = User;
