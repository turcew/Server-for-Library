require("dotenv").config();

const fs = require("fs");
const express = require("express");

const cors = require("cors");

const {
  errorHandlers: { validationErrorHandler, errorHandler },
} = require("./middleware");
const router = require("./routers/index");

const app = express();

app.use(cors());

const HOST_NAME = "127.0.0.1";
const PORT = process.env.PORT;

app.use(express.json());

app.use(validationErrorHandler);

app.use("/api", router);

app.get("/", (req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      return res.status(404).send("Страница не найдена");
    }

    res.set("Content-Type", "text/html; charset=utf-8").send(data);
  });
});

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});

module.exports = app;
