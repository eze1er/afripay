import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
  icon?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-blue-50 text-blue-800',
      destructive: 'bg-red-50 text-red-800',
      success: 'bg-green-50 text-green-800',
    };
    
    const icons = {
      default: 'heroicons:information-circle-20-solid',
      destructive: 'heroicons:exclamation-circle-20-solid',
      success: 'heroicons:check-circle-20-solid',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded-md flex items-start',
          variants[variant],
          className
        )}
        {...props}
      >
        <Icon icon={icons[variant]} className="h-5 w-5 mr-3 flex-shrink-0" />
        <div className="flex-1">{children}</div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription };