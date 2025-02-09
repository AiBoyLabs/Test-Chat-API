const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Here you would typically integrate with your AI service
        // For now, we'll send a simple response
        const response = {
            reply: "I am processing your request..."
        };
        
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
