const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const path = require("path");
const dotenv = require("dotenv");

// Configuring env variables
dotenv.config({ path: "./config.env" });

// Global Variables
const PORT = process.env.PORT || 8000;

// Middlewares
// Setting up the static files for REACT
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Socket.io
io.on("connection", (socket) => {});

// Server initialization
http.listen(PORT, () => {
  console.log("Server initialized at port: " + PORT);
});
