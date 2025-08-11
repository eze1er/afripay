import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'XOF' },
  isVerified: { type: Boolean, default: false },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'support'], 
    default: 'user' 
  },
  accounts: [{
    provider: { 
      type: String, 
      enum: ['mpesa', 'orange', 'mtn', 'airtel'] 
    },
    accountId: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);