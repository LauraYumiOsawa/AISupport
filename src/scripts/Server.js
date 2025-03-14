require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.REACT_APP_API_PORT || 3001;

app.use(cors());
app.use(express.json());

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const API_KEY = process.env.GPT_API_KEY;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(DEEPSEEK_API_URL, {
            model: "deepseek-chat",
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao conectar com o DeepSeek" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
