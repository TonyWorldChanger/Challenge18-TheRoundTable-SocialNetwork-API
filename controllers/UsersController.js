const Users = require("../models/Users");

module.exports = {
    getUsers(req, res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        Users.findOne({_id: req.params.userId })
            .select("-__V")
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
    
};