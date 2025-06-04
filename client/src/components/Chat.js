import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from '../api/axios';

const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');

const Chat = ({ currentChatUser, currentUser }) => { 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); 

  const getRoomName = (user1Id, user2Id) => {
    return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
  };

  useEffect(() => {
    if (!currentUser || !currentChatUser) return; 

    const roomName = getRoomName(currentUser._id, currentChatUser._id);
    socket.emit('joinRoom', roomName); 

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`/api/chat/${currentChatUser._id}`, config);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    socket.on('receiveMessage', (messageData) => {
      const messageRoom = getRoomName(messageData.senderId, messageData.receiverId);
      if (messageRoom === roomName) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    });

    return () => {
      socket.off('receiveMessage'); 
    };
  }, [currentChatUser, currentUser]); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !currentUser || !currentChatUser) return;

    const roomName = getRoomName(currentUser._id, currentChatUser._id);

    socket.emit('sendMessage', {
      senderId: currentUser._id,
      receiverId: currentChatUser._id,
      message: newMessage,
      roomName: roomName
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: currentUser._id,
        receiverId: currentChatUser._id,
        content: newMessage, 
        timestamp: new Date()
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="card shadow-lg p-3" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <h5 className="card-title text-center text-primary mb-3">Chat with {currentChatUser ? currentChatUser.name : 'Someone'}</h5>
      <div className="flex-grow-1 overflow-auto mb-3 p-2 border rounded bg-light">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`d-flex mb-2 ${msg.senderId === currentUser._id ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`p-2 rounded ${msg.senderId === currentUser._id ? 'bg-primary text-white' : 'bg-secondary text-white'}`} style={{ maxWidth: '70%' }}>
                
                {msg.content} <small className="text-end ms-2" style={{ fontSize: '0.7em', opacity: '0.8' }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
                
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">Start a conversation!</p>
        )}
        <div ref={messagesEndRef} /> 
      </div>
      <form onSubmit={handleSendMessage} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default Chat;