

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://flowgastro.com', 
    'https://flowgastro.com', 
    'http://localhost:3000'  
  ],
  credentials: true,
}));
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/products', require('./routes/products'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/timeoff', require('./routes/timeOff'));
app.use('/api/chat-groups', require('./routes/chatGroups'));


// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));

