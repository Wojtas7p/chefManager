// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   login: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN' }, // ADMIN / USER
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // kto stworzył konto
  permissions: {
    canAddSuppliers: { type: Boolean, default: true },
    canAddProducts: { type: Boolean, default: true },
    readOnly: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('User', UserSchema);
