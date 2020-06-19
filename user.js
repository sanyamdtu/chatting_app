var users = [];

function adduser(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getuser(id) {
  return users.find((user) => user.id === id);
}

function deleteuser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1);
}

function getusers_room(room) {
  return users.filter((user) => user.room === room);
}
module.exports = {
  getuser,
  adduser,
  deleteuser,
  getusers_room,
};
