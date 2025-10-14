import { DialogProps } from '@mui/material/Dialog';
import { ReactNode } from 'react';

export interface ModalProps extends Omit<DialogProps, 'title'> {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}
