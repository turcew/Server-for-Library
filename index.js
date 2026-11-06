const http = require("http");
const fs = require("fs");

require("dotenv").config();

const app = require("./src/app");

const HOST_NAME = "127.0.0.1";
const PORT = process.env.PORT;
const server = http.createServer(app);
