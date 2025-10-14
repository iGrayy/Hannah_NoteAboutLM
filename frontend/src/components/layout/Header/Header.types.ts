import { ReactNode } from 'react';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  onNavigateHome?: () => void;
  onOpenSettings?: () => void;
  actions?: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}
