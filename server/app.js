var hapi = require("hapi");

var server = new hapi.Server();
server.connection({
  host: "10.0.1.3",
  port: 8000,
  labels: ["api"]
});
server.connection({
  host: "10.0.1.3",
  port: 8001,
  labels: ["chat"] 
});

var io = require("socket.io")(server.select("chat").listener);

io.on("connection", function (socket) {
  
  socket.on("init", function (event) {
    console.log("init received");
    socket.emit("yo", "Hi!");
  });
});

server.start(function() {
  console.log("Server running at:", server.info.uri);
});