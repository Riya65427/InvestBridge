const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const investorRoutes = require('./routes/investors');
const startupRoutes = require('./routes/startup');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/investors', investorRoutes); 
app.use('/api/startups', startupRoutes); 
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('InvestBridge API is running');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/investbridge'; 
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));