const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: 10
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        ],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Users = model("user", userSchema);

module.exports = Users; 