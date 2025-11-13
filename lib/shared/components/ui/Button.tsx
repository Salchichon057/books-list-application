import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'hover:bg-neutral-100 text-foreground',
    destructive: 'bg-error text-error-foreground hover:bg-error/90',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2 text-base',
    sm: 'h-9 px-3 py-1.5 text-sm',
    lg: 'h-11 px-8 py-2.5 text-lg',
    icon: 'size-10',
    'icon-sm': 'size-8',
    'icon-lg': 'size-12',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
