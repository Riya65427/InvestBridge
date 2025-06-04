const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); 
const { Server } = require('socket.io'); 

dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const investorRoutes = require('./routes/investors');
const startupRoutes = require('./routes/startup');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat'); 
const app = express();
const server = http.createServer(app); 
const io = new Server(server, { 
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes); 

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`User ${socket.id} joined room: ${roomName}`);
  });

  socket.on('sendMessage', async ({ senderId, receiverId, message, roomName }) => {
    io.to(roomName).emit('receiveMessage', {
      // senderId,
      // receiverId,
      // content :message,
      // timestamp: new Date() 
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


