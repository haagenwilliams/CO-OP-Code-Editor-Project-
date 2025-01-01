import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// This connects to the server
const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // This looks for incoming chage messages
  useEffect(() => {
    socket.on("chat-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send a chat message to other users
  const sendMessage = () => {
    socket.emit("chat-message", message);
    setMessage("");
  };

  return (
    <div>
      {/* Display the chat messages */}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      {/* inpt meessages */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;