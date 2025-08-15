import * as React from 'react';
import { cn } from '@/lib/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, external = false, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn('font-medium text-afri-primary hover:underline', className)}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);
Link.displayName = 'Link';

export { Link };