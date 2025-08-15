import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface TypeScript pour l'utilisateur
export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  balance: number;
  currency: string;
  isVerified: boolean;
  role: 'user' | 'admin' | 'support';
  accounts: Array<{
    provider: 'mpesa' | 'orange' | 'mtn' | 'airtel';
    accountId: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
  // Propriétés virtuelles
  id: string;
  name: string; // Combinaison de firstName + lastName
}

// Schéma Mongoose
const UserSchema = new Schema<IUser>({
  firstName: { 
    type: String, 
    required: [true, 'Le prénom est requis'],
    trim: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },
  lastName: { 
    type: String, 
    required: [true, 'Le nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: { 
    type: String, 
    required: [true, 'L\'email est requis'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Format d\'email invalide']
  },
  phone: { 
    type: String, 
    unique: true,
    sparse: true, // Permet les valeurs null/undefined pour unique
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Format de téléphone invalide']
  },
  password: { 
    type: String, 
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  balance: { 
    type: Number, 
    default: 0,
    min: [0, 'Le solde ne peut pas être négatif']
  },
  currency: { 
    type: String, 
    default: 'XOF',
    enum: {
      values: ['XOF', 'XAF', 'USD', 'EUR'],
      message: 'Devise non supportée'
    }
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  role: { 
    type: String, 
    enum: {
      values: ['user', 'admin', 'support'],
      message: 'Rôle invalide'
    },
    default: 'user' 
  },
  accounts: [{
    provider: { 
      type: String, 
      enum: {
        values: ['mpesa', 'orange', 'mtn', 'airtel'],
        message: 'Fournisseur non supporté'
      },
      required: true
    },
    accountId: {
      type: String,
      required: true,
      trim: true
    }
  }]
}, {
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete (ret as any)._id;
      delete (ret as any).__v;
      delete (ret as any).password; // Ne jamais exposer le mot de passe
      return ret;
    }
  },
  toObject: {
    virtuals: true
  }
});

// Virtual pour le nom complet
UserSchema.virtual('name').get(function(this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// Index pour les recherches courantes
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ role: 1, isVerified: 1 });

// Middleware pre-save pour hasher le mot de passe
UserSchema.pre<IUser>('save', async function(next) {
  // Ne hasher que si le mot de passe a été modifié
  if (!this.isModified('password')) return next();
  
  try {
    // Ici vous pouvez ajouter le hashage du mot de passe avec bcrypt
    // const bcrypt = require('bcryptjs');
    // this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  // Ici vous pouvez ajouter la comparaison avec bcrypt
  // const bcrypt = require('bcryptjs');
  // return await bcrypt.compare(candidatePassword, this.password);
  return candidatePassword === this.password; // Temporaire - à remplacer par bcrypt
};

// Méthode pour obtenir les informations publiques de l'utilisateur
UserSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    name: this.name,
    email: this.email,
    phone: this.phone,
    currency: this.currency,
    isVerified: this.isVerified,
    role: this.role,
    createdAt: this.createdAt
  };
};

// Modèle Mongoose
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;