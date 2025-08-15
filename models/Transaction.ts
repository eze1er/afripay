// models/Transaction.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface TypeScript pour la transaction
export interface ITransaction extends Document {
  user: Types.ObjectId;
  amount: number;
  currency: string;
  type: 'transfer' | 'topup' | 'withdrawal' | 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  contact?: Types.ObjectId | string;
  reference: string;
  fee: number;
  netAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schéma Mongoose
const transactionSchema = new Schema<ITransaction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [100, 'Le montant minimum est de 100']
  },
  currency: {
    type: String,
    required: true,
    enum: ['XAF', 'USD', 'EUR', 'XOF'],
    default: 'XAF'
  },
  type: {
    type: String,
    required: true,
    enum: ['transfer', 'topup', 'withdrawal', 'payment', 'refund']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'La description doit contenir au moins 5 caractères'],
    maxlength: [100, 'La description ne peut pas dépasser 100 caractères']
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  },
  reference: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fee: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Les frais ne peuvent pas être négatifs']
  },
  netAmount: {
    type: Number,
    required: true,
    min: [0, 'Le montant net ne peut pas être négatif']
  }
}, {
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  toJSON: {
    virtuals: true,
 transform: (doc: any, ret: any) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;}

    }
  
});

// Calcul du montant net avant sauvegarde
transactionSchema.pre<ITransaction>('save', function(next) {
  this.netAmount = this.amount - this.fee;
  next();
});

// Génération automatique de la référence
transactionSchema.pre<ITransaction>('save', async function(next) {
  if (!this.isNew) return next();
  
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  
  this.reference = `TRX-${datePart}-${randomPart}`;
  next();
});

// Index pour les recherches courantes
transactionSchema.index({ user: 1, status: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ reference: 1 }, { unique: true });

// Modèle Mongoose
const Transaction = mongoose.models.Transaction || 
                   mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;