const socket = io();

socket.on('notification', (message) => {
  alert(message);
});
