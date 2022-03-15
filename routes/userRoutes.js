const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {

    login,
    register,
    getAllUsers,

} = require("../controllers/userController");


router.post("/", register);
router.post("/login", login);
router.get("/", getAllUsers);
// router.patch("/:id", updateUser);
// router.delete("/:id", removeUser);

module.exports = router;