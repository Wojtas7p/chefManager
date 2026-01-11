const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN' }, // ADMIN / USER
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permissions: {
    canAddSuppliers: { type: Boolean, default: true },
    canAddProducts: { type: Boolean, default: true },
    readOnly: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('User', UserSchema);
