const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,

} = require("../../controllers/ThoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts reactions
router.route("/:thoughtId/reactions").post(addThoughtReaction);

router.route("/:thoughtId/reactions/:reactionsId").delete(removeThoughtReaction);

module.exports = router;