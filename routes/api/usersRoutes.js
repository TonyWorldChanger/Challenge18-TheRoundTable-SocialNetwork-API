const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,

} = require("../../controllers/UsersController");

// /api/users
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser);

module.exports = router;