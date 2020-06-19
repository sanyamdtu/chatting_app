$(function() {
  console.log("connected");
  const socket = io();
  const input_box = $("#chat-form");
  const input_box_val = $("#msg");
  const chat_messages = $(".chat-messages");
  const userslist = $("#users");
  const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  socket.emit("join_room", username, room);
  input_box.on("submit", (e) => {
    e.preventDefault();
    socket.emit("chat_message", input_box_val.val());
    input_box_val[0].value = "";
  });
  socket.on("users", (users) => {
    let ans = "";
    for (let user of users) {
      ans += ` <li>${user.username}</li>
    `;
    }
    userslist.html(ans);
  });
  socket.on("message", (msg) => {
    chat_messages.append(`
              <div class="chat-container">
                 <p class="meta">${msg.username} 
                   <span>${msg.time}</span>
                 </p>
                 <p class="text">
                   ${msg.text}
                 </p>
              </div>
        `);
    chat_messages.scrollTop = chat_messages.scrollHeight;
  });
});
