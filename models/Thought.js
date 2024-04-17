const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {type: Schema.Types.ObjectId}, // Double check this one
    reactionBody: {type: String, required: true, maxlength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true, minlength: 1, maxlength: 280},
    createdAt: {type: Date, default: Date.now}, 
    username: {type: String, required: true}, // (The user that created this thought)
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    },
})

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

  const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought