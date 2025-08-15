// scripts/seed-transactions.ts
import mongoose from 'mongoose';
import Transaction from '@/models/Transaction';
import { connectDB } from '@/lib/db';

const seedTransactions = async () => {
  try {
    await connectDB();
    await Transaction.deleteMany({});

    const transactions = [
      {
        user: new mongoose.Types.ObjectId('65a1b2c3d4e5f6a7b8c9d0e1'),
        amount: 20000,
        currency: 'XAF',
        type: 'topup',
        description: 'Recharge mobile',
        fee: 0,
      },
      {
        user: new mongoose.Types.ObjectId('65a1b2c3d4e5f6a7b8c9d0e1'),
        amount: 5000,
        currency: 'XAF',
        type: 'transfer',
        description: 'Envoi à Marie Curie',
        fee: 100,
      },
      // Ajouter d'autres transactions...
    ];

    await Transaction.insertMany(transactions);
    console.log('Transactions seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding transactions:', error);
    process.exit(1);
  }
};

seedTransactions();