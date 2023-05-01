const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reactions");


const thoughtSchema = new Schema(
    { // creating parameters for the thoughts section
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
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

thoughtSchema.virtual("thoughtCount").get(function () {
    return this.thoughts.length;
});

const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;