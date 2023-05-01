const { Users, Thoughts } = require("../models");


const allUsers = async () => 
    Users.aggregate()
        .count("userCount")
        .then((usersTotal) => usersTotal);

module.exports = {
    getUsers(req, res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        Users.findOne({_id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                  ? res.status(404).json({ message: "No user with that ID" }) 
                  : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        Users.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
        .then((user) =>
            !user
                ? res.status(400).json({ message: "No user with that ID" })
                : res.json({ user: "User Added" })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        Users.findOneAndRemove({ _id: req.params.userId })
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No user with that ID" })
                : Thoughts.findOneAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.userId }},
                    { new: true }

                )
        )
        .then((thought) => 
                    !thought
                        ? res.status(404).jsoon({ message: "User deleted, but no thought found" })
                        : res.json({ message: "User successfully deleted" })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
};