const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,

} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts reactions
router.route("/:thoughtId/reactions").post(addThoughtReaction).delete(removeThoughtReaction);

module.exports = router;