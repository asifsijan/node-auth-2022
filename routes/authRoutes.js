const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

//routes requiring authorization


router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});


module.exports = router;
