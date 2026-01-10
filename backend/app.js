const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/items', require('./routes/items'));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  // SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Serwer działa na porcie ${PORT}`)
);



