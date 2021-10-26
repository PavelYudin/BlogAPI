const express = require('express');
const router = express.Router();

const controller=require("../controllers/controller");

router.post("/createAutor",controller.createAutor);
router.post("/createCategory",controller.createCategory);
router.post("/createArticle",controller.createArticle);
router.post("/createCommentArticle",controller.createCommentArticle);
router.get("/categories/:nameCategory",controller.getArticlesCategory);

module.exports = router;