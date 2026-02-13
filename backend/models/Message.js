const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null // null = groupe message
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatGroup',
      default: null // czat grupowy
      
    },
       
    text: {
      type: String,
      required: true,
      trim: true
    },

    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
