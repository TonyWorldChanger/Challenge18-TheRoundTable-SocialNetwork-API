const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reactions");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            get: (date) => {
                if (date) {
                    return date.toLocaleDateString();
                }
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            virtuals: true, 
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thoughts = model("thought", thoughtSchema);

module.exports = Thoughts;