const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");
const { username, email, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
    await Thoughts.deleteMany({});
    await Users.deleteMany({});

    const users = [];
    const usersThoughts = [];

    for (let i = 0; i < username.length; i++) {
        const usersObject = {
            usersname: username[i],
            email: email[i],
        };
            const newUser = await Users.create(usersObject);
            users.push({
                _id: newUser._id.toString(),
                username: newUser.username,
            });
    }

    for (let i = 0; i < thoughts.length; i++) {
        const thoughtsObject = {
            username: username[i],
            thoughtText: thoughts[i],
        };
            const newThought = await Thoughts.create(thoughtsObject);
            usersThoughts.push({
                _id: newThought._id.toString(),
                username: newThought.username,
            });
    }

    for (let i = 0; i < usersThoughts.length; i++) {
        const userId = users.filter (
            (user) => user.username === usersThoughts[i].usersname
        );
        console.log("User Id", userId);
        const updateUser = await Users.findOneAndUpdate(
            {_id: userId[0]._id },
            {$push: { thouhgts: usersThoughts[i]._id }},
            { new: true}
        );
        console.log(updateUser);
    }
        process.exit(0);

});