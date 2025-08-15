// components/dashboard/RecentTransactions.tsx
import React from 'react';
import { useTranslations } from 'next-intl';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
  type: 'income' | 'expense';
  date: Date;
  status: string;
  contact?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  locale: string;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions, locale }) => {
  const t = useTranslations('Dashboard');
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {t('recentTransactions')}
      </h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{transaction.description}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatDate(transaction.date)}
                  {transaction.contact && ` • ${transaction.contact}`}
                </p>
              </div>
            </div>
            <div className={`text-right ${
              transaction.type === 'income' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              <p className="font-medium">
                {transaction.type === 'income' ? '+' : '-'}
                {formatAmount(transaction.amount, transaction.currency)}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;