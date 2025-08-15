// app/[locale]/dashboard/page.tsx
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import BalanceCard from '@/components/dashboard/BalanceCard';
import TransactionChart from '@/components/dashboard/TransactionChart';
import TransferForm from '@/components/dashboard/TransferForm';
import RecentTransactions from '@/components/dashboard/RecentTransactions'; // Import corrigé
import { getDashboardData } from '@/lib/api';
import  User  from '@/models/User';

export default async function DashboardPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('Dashboard');
  
  // Récupération de l'utilisateur connecté via les headers
  const headersList = await headers();
  const userData = headersList.get('x-user');
  const currentUser: User = userData ? JSON.parse(userData) : {
    id: 'user-123',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    currency: 'XAF'
  };

  // Récupération des données du dashboard
  const dashboardData = await getDashboardData(currentUser.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('title')}, {currentUser.name} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {t('subtitle')}
        </p>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - Solde et formulaire */}
        <div className="lg:col-span-1 space-y-6">
          <BalanceCard 
            balance={dashboardData.balance} 
            currency={currentUser.currency}
          />
          
          <TransferForm 
            currencies={['XAF', 'USD', 'EUR']} 
            contacts={dashboardData.contacts}
          />
        </div>

        {/* Colonne droite - Graphique et historique */}
        <div className="lg:col-span-2 space-y-6">
          <TransactionChart 
            data={dashboardData.transactionsChart} 
          />
          
          <RecentTransactions 
            transactions={dashboardData.recentTransactions} 
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}

// Fonction de simulation de données
async function getDashboardData(userId: string) {
  // Simuler un délai de chargement
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    balance: 125000,
    contacts: [
      { id: '1', name: 'John Doe', phone: '+237690000000' },
      { id: '2', name: 'Jane Smith', phone: '+237691111111' },
      { id: '3', name: 'Robert Johnson', phone: '+237692222222' },
      { id: '4', name: 'Sarah Williams', phone: '+237693333333' },
      { id: '5', name: 'Michael Brown', phone: '+237694444444' }
    ],
    transactionsChart: [
      { name: 'Jan', income: 12000, expense: 8000 },
      { name: 'Fév', income: 19000, expense: 11000 },
      { name: 'Mar', income: 15000, expense: 9000 },
      { name: 'Avr', income: 18000, expense: 12000 },
      { name: 'Mai', income: 21000, expense: 10000 }
    ],
    recentTransactions: [
      {
        id: '1',
        description: 'Transfert à Jane Smith',
        amount: 5000,
        currency: 'XAF',
        type: 'expense',
        date: new Date('2023-07-15'),
        status: 'completed',
        contact: 'Jane Smith'
      },
      {
        id: '2',
        description: 'Salaire',
        amount: 200000,
        currency: 'XAF',
        type: 'income',
        date: new Date('2023-07-10'),
        status: 'completed'
      },
      {
        id: '3',
        description: 'Achat en ligne',
        amount: 35000,
        currency: 'XAF',
        type: 'expense',
        date: new Date('2023-07-05'),
        status: 'completed'
      },
      {
        id: '4',
        description: 'Recharge mobile',
        amount: 5000,
        currency: 'XAF',
        type: 'expense',
        date: new Date('2023-07-01'),
        status: 'completed'
      },
      {
        id: '5',
        description: 'Virement de Paul',
        amount: 15000,
        currency: 'XAF',
        type: 'income',
        date: new Date('2023-06-28'),
        status: 'completed'
      }
    ]
  };
}