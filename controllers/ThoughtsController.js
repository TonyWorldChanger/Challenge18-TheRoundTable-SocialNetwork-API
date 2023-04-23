const { Thoughts, Users } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({_id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "No thought with that ID" })
                    : res.json(thought) 
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thoughts.create(req.body)
        .then((thought) => {
            return Users.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user) =>
            !user
                ? res.status(400).json({
                    message: "Thought created, but found no user with that ID",
                })
                : res.json("created the thought 🎉")
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(400).json({ message: "No thought with this id" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought with this id" })
                    : Users.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId }},
                        { new: true }
                    )
            )
            .then((user) => 
                !user 
                ? res
                    .status(404).json({ message: "Thought created but no user with this id" })
                : res.json({ message: "Thought successfully deleted" })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a reaction to thoughts
    addThoughtReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought with this id" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove a reaction from thoughts
    removeThoughtReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}}, 
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought with this id" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};