const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    // reactionId: {}
    reactionBody: {type: String, required: true}, //  Must be between 1 and 280 characters
    username: {type: String, required: true},
    createdAt: {type: Date}, //created at date
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true}, //  Must be between 1 and 280 characters
    createdAt: {type: Date}, //created at date
    username: {type: String, required: true}, // (The user that created this thought)
    reactions: [reactionSchema]
})



const Thought = mongoose.model('Thought', thoughtSchema);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.




module.exports = Thought