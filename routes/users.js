const express = require("express");
const router = express.Router({ mergeParams: true });
const usersController = require("../controllers/usersController");


// Matches with "/api/users"
/* router.route("/")
    .get(usersController.findUsers)
    .post(usersController.addUser); */

// Matches with "/api/users/:userId/"
router.route("/")
    .get(usersController.getUser)
    .put(usersController.updateUser);

module.exports = router;