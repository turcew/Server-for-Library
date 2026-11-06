const { Router } = require("express");

const authorRouter = require("./authorRouters");
const customerRouter = require("./customerRouter");
const bookRouter = require("./bookRouter");

const router = new Router();

router.use("/authors", authorRouter);
router.use("/customers", customerRouter);
router.use("/books", bookRouter);

module.exports = router;
