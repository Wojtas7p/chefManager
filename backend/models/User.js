const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN' }, // ADMIN / USER
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permissions: {
  canAddSuppliers: { type: Boolean, default: false },
  canAddProducts: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: true },
  canManageSchedule: { type: Boolean, default: false }
}
});

module.exports = mongoose.model('User', UserSchema);
