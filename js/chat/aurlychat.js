document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('footer input');
    const sendButton = document.querySelector('footer button');

    // Object to store messages for each chat
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || {};

    function updateChatHistory(name) {
        chatHistory[name] = chatMessages.innerHTML;
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            const message = document.createElement('div');
            message.classList.add('message');
            message.innerHTML = `
                <img src="images/aurly.png" alt="Profile Picture">
                <div class="message-text">${messageText}</div>
            `;
            chatMessages.appendChild(message);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Save the new message to the chat history
            const chatName = 'Aurly'; // Name of the current chat
            updateChatHistory(chatName);
        }
    }

    // Load messages from session storage on page load
    const chatName = 'Aurly'; // Name of the current chat
    chatMessages.innerHTML = chatHistory[chatName] || '';
});


