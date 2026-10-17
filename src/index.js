const http = require("http");
const fs = require("fs");

const HOST_NAME = "127.0.0.1";
const PORT = 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(`URL is ${url}`);
  console.log(`METHOD is ${url.method}`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  //   res.write("<h1>Server</h1>");
  //   res.end();
  switch (url) {
    case "/":
      console.log("Home page");
      const homePage = fs.readFileSync("../public/index.html");
      res.write(homePage);
      res.end();
      break;
    default:
      res.write("<h1>Page not found</h1>");
      res.end();
  }
});

server.listen(PORT, HOST_NAME, () =>
  console.log(`Server running at http://${HOST_NAME}:${PORT}`),
);
