// types/transaction.d.ts
import { Document, Types } from 'mongoose';
import { IUser } from '@/models/User';
import { IContact } from '@/models/Contact';

declare global {
  namespace Models {
    interface Transaction {
      id: string;
      user: Types.ObjectId | IUser;
      amount: number;
      currency: string;
      type: 'transfer' | 'topup' | 'withdrawal' | 'payment' | 'refund';
      status: 'pending' | 'completed' | 'failed' | 'cancelled';
      description: string;
      contact?: Types.ObjectId | IContact | string;
      reference: string;
      fee: number;
      netAmount: number;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}