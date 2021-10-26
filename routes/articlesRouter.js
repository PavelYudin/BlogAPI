const express = require('express');
const articlesRouter = express.Router();

const controller=require("../controllers/controller");

articlesRouter.get("/:articleId",controller.getInfoArticle);
articlesRouter.get("/:articleId/comments",controller.getCommentsArticle);

module.exports = articlesRouter;