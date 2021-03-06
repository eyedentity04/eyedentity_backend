const express = require("express");
const router = express.Router();
const friendsControler = require("../controllers/Friends");

router.post("/create", friendsControler.addFriends);
router.get("/show", friendsControler.getAllFriends);
router.delete("/del", friendsControler.deleteFriends);
router.get("/get/:usersId",friendsControler.getPostFriends)

module.exports = router;
