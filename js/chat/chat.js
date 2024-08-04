document.addEventListener('DOMContentLoaded', (event) => {
    // Profile dropdown management
    const profile = document.querySelector('.profile');
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown-menu');
    dropdown.innerHTML = `
        <a href="#">Profile</a>
        <a href="#">Logout</a>
    `;
    profile.appendChild(dropdown);

    profile.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
        if (!profile.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Chat management
    const chatItems = document.querySelectorAll('.chat-item');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    // Object to store messages for each chat
    const chatHistory = {};

    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the name of the selected chat item
            const chatName = item.querySelector('span').textContent;

            // Save current chat messages to chatHistory
            const activeItem = document.querySelector('.chat-item.active');
            if (activeItem) {
                const activeName = activeItem.querySelector('span').textContent;
                chatHistory[activeName] = chatMessages.innerHTML;
            }

            // Load chat messages for the selected chat item
            chatMessages.innerHTML = chatHistory[chatName] || '';
            document.querySelector('.chat-item.active')?.classList.remove('active');
            item.classList.add('active');

            // Update session storage
            sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        });
    });

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
                <img src="images/doronprofilepicture.png" alt="Profile Picture">
                <div class="message-text">${messageText}</div>
            `;
            chatMessages.appendChild(message);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Save the new message to the chat history
            const activeItem = document.querySelector('.chat-item.active');
            if (activeItem) {
                const activeName = activeItem.querySelector('span').textContent;
                chatHistory[activeName] = chatMessages.innerHTML;
                
                // Update session storage
                sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            }
        }
    }

    // Load messages from session storage on page load
    const storedChatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || {};
    Object.assign(chatHistory, storedChatHistory);

    const activeItem = document.querySelector('.chat-item.active');
    if (activeItem) {
        const activeName = activeItem.querySelector('span').textContent;
        chatMessages.innerHTML = chatHistory[activeName] || '';
    }
});

