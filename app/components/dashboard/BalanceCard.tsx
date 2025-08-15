// components/dashboard/BalanceCard.tsx
import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
interface BalanceCardProps {
  balance: number;
  currency: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, currency }) => {
  const t = useTranslations('Dashboard');

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="p-5">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {t('balance')}
        </h2>
        
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatBalance(balance)}
          </span>
          <span className="ml-2 text-lg font-medium text-gray-600 dark:text-gray-400">
            {currency}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {/* Bouton Recharger */}
          <Button 
            variant="primary"
            className="flex flex-col items-center justify-center py-3"
            as="link"
            href="/dashboard/topup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
            </svg>
            <span>{t('topup')}</span>
          </Button>
          
          {/* Bouton Envoyer */}
          <Button 
            variant="primary"
            className="flex flex-col items-center justify-center py-3"
            as="link"
            href="/dashboard/send"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18m0 0l-4-4m4 4l4-4" />
            </svg>
            <span>{t('send')}</span>
          </Button>
          
          {/* Bouton Historique */}
          <Button 
            variant="primary"
            className="flex flex-col items-center justify-center py-3"
            as="link"
            href="/dashboard/history"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('history')}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;