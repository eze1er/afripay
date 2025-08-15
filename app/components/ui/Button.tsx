// components/ui/Button.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  className?: string;
  as?: 'button' | 'link'; // Ajout de la prop 'as'
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  as = 'button', // Valeur par défaut
  href = '',
  onClick,
  type = 'button',
  disabled = false
}) => {
  const baseClasses = "transition-all duration-200 font-medium rounded-lg text-center inline-flex items-center justify-center px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300",
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-800 dark:text-white",
    link: "bg-transparent underline text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
  };

  const variantClass = variantClasses[variant] || variantClasses['default'];
  const combinedClasses = `${baseClasses} ${variantClass} ${className}`;

  // Rendu conditionnel basé sur la prop 'as'
  if (as === 'link' && href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={combinedClasses} 
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;