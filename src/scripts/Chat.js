import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';

const API_PORT = process.env.REACT_APP_API_PORT || 3001;
const API_URL = `http://localhost:${API_PORT}/chat`;

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
        const botMessage = { text: response.data.choices[0].message.content, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Erro DeepSeek:', error.response ? error.response.data : error.message);
        const errorMessage = { text: 'Erro de request.', sender: 'bot' };
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
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;