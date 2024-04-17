const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/] }, //needs to be valid email? regex?
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thought",
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "user",
    }],
}, {
    toJSON: {
        virtuals: true,
    },
});

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});


const User = mongoose.model('user', userSchema)

module.exports = User;
