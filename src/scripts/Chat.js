import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';
import Header from "../components/Header";

const API_URL = `http://localhost:3001/chat`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const extractThought = (text) => {
    const match = text.match(/<think>(.*?)<\/think>/);
    return match ? match[1] : null;
  };

  const cleanMessage = (text) => {
    return text.replace(/<think>.*?<\/think>/g, '');
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
  
      try {
        const response = await axios.post(API_URL, { message: input });
        const botText = response.data.text;
        const thought = extractThought(botText);  // Extract the thought
        const cleanText = cleanMessage(botText);  // Clean the main message
        
        const botMessage = { text: cleanText, sender: 'bot', thought };
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
      <Header />
      <div className="Chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`Chat-message ${msg.sender}`}>
            {/* If there's a thought, display it separately */}
            {msg.thought && (
              <div className="Chat-thought">
                <span role="img" aria-label="thought">🤔</span> {msg.thought}
              </div>
            )}
            {/* Display the rest of the message */}
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
