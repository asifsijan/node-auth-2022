const express = require("express");
const router = express.Router();
const {
    getTests,
    getTestById,
    postTest,
    updateTest,
    removeTest,
    getByName,
} = require("../controllers/testController");

router.get("/", getTests);
router.get("/:name", getByName);
router.get("/:id", getTestById);
router.post("/", postTest);
router.patch("/:id", updateTest);
router.delete("/:id", removeTest);

module.exports = router;