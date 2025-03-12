import React, { useState } from 'react';
import '../styles/Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
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