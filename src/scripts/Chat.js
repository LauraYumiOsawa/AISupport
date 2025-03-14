import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';

// const API_PORT = process.env.REACT_APP_API_PORT || 3001;
const API_URL = `http://localhost:3001/chat`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        const response = await axios.post(API_URL, { message: input });
        const botMessage = { text: response.data.text, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Erro Ollama:', error.message);
        const errorMessage = { text: 'Erro ao conectar com Ollama.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="Chat">
      <div className="Chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`Chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="Chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
