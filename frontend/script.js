document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const aboutSection = document.querySelector('.about-section');
    const providersSection = document.querySelector('.providers-section');
    const chatContainer = document.querySelector('.chat-container');
    
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

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            // Simulate bot response
            setTimeout(() => {
                addMessage('I am processing your request...');
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
}); 
