const { Router } = require("express");

const AuthorController = require("../controllers/authorController");
const authorController = new AuthorController();

const { validateAuthor } = require("../middleware/validate.mw");

const router = new Router();

router
  .route("/")
  .get(authorController.getAuthors)
  .post(validateAuthor, authorController.createAuthor)
  .put(validateAuthor, authorController.updateAuthor);
router
  .route("/:authorId")
  .get(authorController.getAuthorsById)
  .delete(authorController.deleteAuthor);

module.exports = router;
