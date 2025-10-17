import React, { useEffect } from 'react';

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  );
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
  return (
    <div className={`relative z-50 w-full max-w-lg max-h-[90vh] mx-4 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${className}`}>
      <div className="overflow-y-auto flex-1 p-6" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#9CA3AF #F3F4F6'
      }}>
        <style>{`
          .dialog-content::-webkit-scrollbar {
            width: 8px;
          }
          .dialog-content::-webkit-scrollbar-track {
            background: #F3F4F6;
            border-radius: 4px;
          }
          .dialog-content::-webkit-scrollbar-thumb {
            background: #9CA3AF;
            border-radius: 4px;
          }
          .dialog-content::-webkit-scrollbar-thumb:hover {
            background: #6B7280;
          }
        `}</style>
        <div className="dialog-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className = '' }: DialogDescriptionProps) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  return <>{children}</>;
}
