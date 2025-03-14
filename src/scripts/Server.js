require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.REACT_APP_API_PORT || 3001;

app.use(cors());
app.use(express.json());

const OLLAMA_API_URL = "http://localhost:11434/api/generate";

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(OLLAMA_API_URL, {
            model: "deepseek-r1:7b",
            prompt: message,
            stream: false
        });

        res.json({ text: response.data.response });
    } catch (error) {
        console.error("Erro Ollama:", error.message);
        res.status(500).json({ error: "Erro ao conectar com o Ollama" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
