
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');


// Połączenie z MongoDB
connectDB();

app.use(express.json());

// trasy
app.use('/items', require('./routes/items'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
