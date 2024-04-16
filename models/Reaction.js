const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionBody: {type: String, required: true}, //  Must be between 1 and 280 characters
    username: {type: String, required: true},
    createdAt: {type: Date}, //created at date
})

const Reaction = mongoose.model('Reaction', reactionSchema);

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.




module.exports = Reaction