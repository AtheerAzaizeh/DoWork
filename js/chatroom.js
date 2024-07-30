const socket = io();

const sendMessageForm = document.getElementById('sendMessageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('sendMessage', message);
  messageInput.value = '';
});

socket.on('receiveMessage', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
});
