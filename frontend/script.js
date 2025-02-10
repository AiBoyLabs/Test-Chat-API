// Simple test script
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');  // Проверка загрузки DOM

    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');

    // Проверяем что все элементы найдены
    if (!chatInput || !sendButton || !chatMessages) {
        console.error('Required elements not found:', {
            chatInput: !!chatInput,
            sendButton: !!sendButton,
            chatMessages: !!chatMessages
        });
        return;
    }

    console.log('All elements found');  // Подтверждение что элементы найдены
    
    const API_URL = 'https://test-chat-api.onrender.com';

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage(message) {
        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.reply;
        } catch (error) {
            console.error('Error:', error);
            return 'Sorry, there was an error processing your request.';
        }
    }

    // Chat input handling
    sendButton.addEventListener('click', async () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            sendButton.disabled = true;
            const reply = await sendMessage(message);
            addMessage(reply);
            sendButton.disabled = false;
        }
    });

    // Enter key handling
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
