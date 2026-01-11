// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const auth = require('./middleware/auth');

// dotenv.config();

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());

// // routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/suppliers', auth, require('./routes/suppliers'));
// app.use('/api/products', auth, require('./routes/products'));



// // DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

//   // SERVER
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`Serwer działa na porcie ${PORT}`)
// );


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/products', require('./routes/products'));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));

