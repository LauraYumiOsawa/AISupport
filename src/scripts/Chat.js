import React, { useState } from 'react';
import '../styles/Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        const chatGroq = new ChatGroq({ apiKey: process.env.REACT_APP_CHATGROQ_API_KEY });
        const response = await chatGroq.ask(input);

        const botMessage = { text: response.answer, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error with ChatGroq:', error);
        const errorMessage = { text: 'Sorry, there was an error processing your request.', sender: 'bot' };
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