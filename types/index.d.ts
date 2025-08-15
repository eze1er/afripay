// types/index.d.ts
import { User } from '@/models/User';

declare global {
  namespace Models {
    interface Transaction {
      id: string;
      description: string;
      amount: number;
      currency: string;
      type: 'income' | 'expense';
      date: Date;
      status: string;
      contact?: string;
    }
  }

  // Déclaration pour les headers
  declare module 'next/headers' {
    export function headers(): Headers;
  }
}