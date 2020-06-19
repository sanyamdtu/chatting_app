var express = require("express"),
  app = express(),
  path = require("path"),
  http = require("http"),
  server = http.createServer(app),
  socketio = require("socket.io"),
  io = socketio(server),
  chat_bot = "chatbot",
  format = require("./util/messages"),
  user_functions = require("./user");
//

// body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//socket io
io.on("connection", (socket) => {
  socket.on("join_room", (username, room) => {
    socket.join(room);
    user_functions.adduser(socket.id, username, room);
    io.emit("users", user_functions.getusers_room(room));
    socket.emit("message", format(chat_bot, `${username} has Joined the chat`));
    socket.on("chat_message", (message) => {
      const user = user_functions.getuser(socket.id);
      io.to(room).emit("message", format(user.username, message));
    });
    socket.on("disconnect", () => {
      const user = user_functions.getuser(socket.id);
      user_functions.deleteuser(user.id);
      io.emit("users", user_functions.getusers_room(room));
      io.emit(
        "message",
        format(chat_bot, `${user.username} has left the chat`)
      );
    });
  });
});

//set static folder
app.use(express.static(path.join(__dirname, "public")));

server.listen(process.env.PORT);
