const { Schema, model } = require("mongoose");

const validateEmail = function(email) {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            validate: [validateEmail, "Email Needed"],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts"
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



const Users = model("user", userSchema);

module.exports = Users; 