

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Enter your name:'));
    const socket = io('http://localhost:8000'); // Replace with your server URL
    socket.emit('new-user-joined', username);

    socket.on('user-joined', (name) => {
      addMessage(`${name} joined the chat..`, 'middle');
    });

    socket.on('recv', (data) => {
      addMessage(`${data.name}: ${data.message}`, 'left');
    });

    socket.on('left', (data) => {
      addMessage(`${data} left the chat`, 'left');
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const addMessage = (message, pos) => {
    setMessages((prevMessages) => [...prevMessages, { message, pos }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(`You: ${message}`, 'right');
    const socket = io('http://localhost:8000'); // Replace with your server URL
    socket.emit('send', message);
    setMessage('');
  };

  return (
    <div className="App">
      <div className="main">
        {messages.map((msg, index) => (
          <div key={index} className={msg.pos}>
            {msg.message}
          </div>
        ))}
        <form onSubmit={handleSubmit} id="myForm">
          <input
            name="umsg"
            id="umsg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;