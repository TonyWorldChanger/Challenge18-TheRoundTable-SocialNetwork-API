const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");
const { usersName, email, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
    await Thoughts.deleteMany({});
    await Users.deleteMany({});

    const users = [];
    const usersThoughts = [];

    for (let i = 0; i < users.length; i++) {
        const usersObject = {
            usersName: usersName[i],
            email: email[i],
        };
            const newUser = await Users.create(usersObject);
            users.push({
                _id: newUser._id.toString(),
                usersName: newUser.usersName,
            });
    }

    for (let i = 0; i < thoughts.length; i++) {
        const thoughtsObject = {
            usersName: usersName[i],
            thoughtsText: thoughts[i],
        };
            const newThought = await Thoughts.create(thoughtsObject);
            usersThoughts.push({
                _id: newThought._id.toString(),
                usersName: newThought.usersName,
            });
    }

    for (let i = 0; i < usersThoughts.length; i++) {
        const userId = users.filter (
            (user) => user.usersName === usersThoughts[i].usersName
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