const express = require("express");

const app = express();

const HOST_NAME = "127.0.0.1";
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST_NAME, () =>
  console.log(`Server running at http://${HOST_NAME}:${PORT}`),
);

app.get("/", (req, res) => {
  fs.readFile("../public/index.html", (err, data) => {
    if (err) {
      res.status(404);
      throw err;
    }
    res.set("Content-Type", "text/html; charset=utf-8").send(data);
  });
});

app.get("/contact", (req, res) => {
  fs.readFile("../public/index.html", (err, data) => {
    if (err) {
      res.status(404);
      throw err;
    }
    res.set("Content-Type", "text/html; charset=utf-8").send(data);
  });
});

module.exports = app;
