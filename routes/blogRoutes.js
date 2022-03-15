const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    getAllBlogs,
    getBlogs,
    postBlog
} = require('../controllers/blogController');



router.get("/all", getAllBlogs);
router.get("/", auth, getBlogs);
router.post("/", auth, postBlog);

module.exports = router;