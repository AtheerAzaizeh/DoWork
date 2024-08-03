document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/chats')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const chatListContainer = document.getElementById('chat-list');
            
            data.forEach(chat => {
                const chatItem = document.createElement('div');
                chatItem.className = 'chat-item';
                chatItem.setAttribute('data-chat', chat.dataChat);

                const img = document.createElement('img');
                img.src = chat.imgSrc;
                img.alt = chat.name;

                const span = document.createElement('span');
                span.textContent = chat.name;

                chatItem.appendChild(img);
                chatItem.appendChild(span);

                chatListContainer.appendChild(chatItem);
            });
        })
        .catch(error => console.error('Error fetching chat data:', error));
});

