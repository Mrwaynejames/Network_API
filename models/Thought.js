const { Schema, model, Types } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateMade => moment(dateMade).format("MMM Do, YYYY"),
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}

);

const Thought = model('thought', thoughtSchema);
module.exports = Thought;