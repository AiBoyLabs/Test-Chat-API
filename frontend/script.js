document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const aboutSection = document.querySelector('.about-section');
    const providersSection = document.querySelector('.providers-section');
    const chatContainer = document.querySelector('.chat-container');
    
    // Replace with actual Render.com URL
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

    // Navigation handling
    document.querySelector('a[href="#about"]').addEventListener('click', (e) => {
        e.preventDefault();
        aboutSection.style.display = 'block';
        chatContainer.style.display = 'none';
        providersSection.style.display = 'none';
    });

    document.querySelector('a[href="#providers"]').addEventListener('click', (e) => {
        e.preventDefault();
        providersSection.style.display = 'block';
        chatContainer.style.display = 'none';
        aboutSection.style.display = 'none';
    });

    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            aboutSection.style.display = 'none';
            providersSection.style.display = 'none';
            chatContainer.style.display = 'block';
        });
    });

    sendButton.addEventListener('click', async () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Show loading state
            sendButton.disabled = true;
            
            // Get response from backend
            const reply = await sendMessage(message);
            addMessage(reply);
            
            // Reset button state
            sendButton.disabled = false;
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
}); 
