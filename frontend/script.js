// Backend URL from Test-Chat-API repository
const BACKEND_URL = 'https://test-chat-api.onrender.com';

// Move handleSend inside DOMContentLoaded to ensure it's available
document.addEventListener('DOMContentLoaded', function() {
    // Define handleSend here
    async function handleSend() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value;
        
        if (!message || message.trim() === '') {
            console.error('Message is empty');
            return;
        }
        
        try {
            // Show loading state
            const sendButton = document.getElementById('sendButton');
            if (sendButton) {
                sendButton.disabled = true;
                sendButton.textContent = 'Sending...';
            }

            console.log('Sending message:', message);
            const response = await fetch(`${BACKEND_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Response received:', data);
            
            // Display messages
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                // User message
                const userDiv = document.createElement('div');
                userDiv.className = 'message user-message';
                userDiv.textContent = message;
                chatMessages.appendChild(userDiv);

                // AI response
                const aiDiv = document.createElement('div');
                aiDiv.className = 'message ai-message';
                aiDiv.textContent = data.reply;
                chatMessages.appendChild(aiDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Clear input and reset button
            messageInput.value = '';
            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send';
            }
            
        } catch (error) {
            console.error('Error:', error);
            const errorDiv = document.getElementById('error-message');
            if (errorDiv) {
                errorDiv.textContent = 'Error sending message. Please try again.';
            }
            
            // Reset button on error
            const sendButton = document.getElementById('sendButton');
            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send';
            }
        }
    }

    // Setup event listeners
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('sendButton');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent default to avoid newline
                handleSend();
            }
        });
        
        // Focus input on page load
        messageInput.focus();
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', handleSend);
        console.log('Send button found and listener added');
    } else {
        console.error('Send button not found!');
    }

    // Add initial welcome message
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message ai-message';
        welcomeDiv.textContent = 'Hello! I am AIBOY. How can I help you today?';
        chatMessages.appendChild(welcomeDiv);
    }
}); 
