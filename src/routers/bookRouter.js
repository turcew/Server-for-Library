const { Router } = require("express");

const BookController = require("../controllers/bookController");
const bookController = new BookController();

const { validateBook } = require("../middleware/validate.mw");

const router = new Router();

router
  .route("/")
  .get(bookController.getBooks)
  .post(validateBook, bookController.createBook)
  .put(validateBook, bookController.updateBook);
router
  .route("/:bookId")
  .get(bookController.getBooksById)
  .delete(bookController.deleteBook);

module.exports = router;
