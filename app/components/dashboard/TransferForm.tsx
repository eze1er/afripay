// components/dashboard/TransferForm.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import   Button  from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { FaSearch, FaUser, FaMoneyBillWave } from 'react-icons/fa';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface TransferFormProps {
  currencies: string[];
  contacts: Contact[];
}

interface FormData {
  recipient: string;
  amount: number;
  currency: string;
  message?: string;
}

const TransferForm: React.FC<TransferFormProps> = ({ currencies, contacts }) => {
  const t = useTranslations('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    defaultValues: {
      currency: currencies[0] || 'XAF'
    }
  });

  // Filtrer les contacts selon la recherche
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    contact.phone.includes(searchTerm)
  );

  // Sélectionner un contact
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setValue('recipient', contact.phone);
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  // Soumission du formulaire
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Transfer data:', data);
    // Ici vous ajouterez la logique d'API
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(t('transferSuccess'));
      reset();
      setSelectedContact(null);
    } catch (error) {
      console.error(t('transferError'), error);
      alert(t('transferError'));
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        {t('transferTitle')}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Champ Destinataire */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {t('recipient')}
          </label>
          
          {selectedContact ? (
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {selectedContact.avatar ? (
                <img 
                  src={selectedContact.avatar} 
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="bg-indigo-100 text-indigo-800 rounded-full p-2 mr-3">
                  <FaUser className="w-5 h-5" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedContact.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {selectedContact.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                {t('change')}
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-7">
                <FaSearch className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-10"
              />
              
              {isSearchFocused && searchTerm && (
                <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                      <div
                        key={contact.id}
                        onClick={() => handleSelectContact(contact)}
                        className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        {contact.avatar ? (
                          <img 
                            src={contact.avatar} 
                            alt={contact.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        ) : (
                          <div className="bg-indigo-100 text-indigo-800 rounded-full p-1 mr-3">
                            <FaUser className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {contact.name}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500 text-center">
                      {t('noContacts')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <input
            type="hidden"
            {...register('recipient', { required: t('recipientRequired') })}
          />
          {errors.recipient && (
            <p className="mt-1 text-red-500 text-sm">{errors.recipient.message}</p>
          )}
        </div>

        {/* Montant et Devise */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t('amount')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-2">
                <FaMoneyBillWave className="text-gray-400" />
              </div>
              <Input
                type="number"
                placeholder="0.00"
                {...register('amount', { 
                  required: t('amountRequired'),
                  min: {
                    value: 100,
                    message: t('minAmount', { amount: 100 })
                  }
                })}
                className="pl-10"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t('currency')}
            </label>
            <select
              {...register('currency')}
              className="w-full p-2.5 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {t('message')} ({t('optional')})
          </label>
          <textarea
            {...register('message')}
            placeholder={t('messagePlaceholder')}
            className="w-full p-2.5 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 min-h-[80px]"
          />
        </div>

        {/* Bouton de soumission */}
<Button
  variant="primary"
  className="w-full py-3 mt-4"
  disabled={isSubmitting}
  type="submit" // Utilisez 'type' au lieu de 'as'
>
  {isSubmitting ? (
    <span className="flex items-center justify-center">
      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {t('processing')}
    </span>
  ) : (
    t('transferButton')
  )}
</Button>
      </form>
    </Card>
  );
};

export default TransferForm;