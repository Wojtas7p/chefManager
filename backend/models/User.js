const mongoose = require('mongoose');

const TrustedDeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  position: {type: String},
  birthDate: {type:Date},
  phone : {type:String},
  role: { type: String, default: 'ADMIN' }, // ADMIN / USER
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // 🔑 PLAN / SUBSCRIPTION (READY FOR BILLING)
  plan: {
    type: String,
    enum: ['FREE', 'PRO', 'ENTERPRISE'],
    default: 'FREE'
  },

  permissions: {
  canAddSuppliers: { type: Boolean, default: false },
  canAddProducts: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: true },
  canManageSchedule: { type: Boolean, default: false }
},

 otp: { type: String }, // 🔥 code veryfication
  otpExpires: { type: Date }, // code validity
  trustedDevices: [TrustedDeviceSchema], // trusted edvice

},  { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
