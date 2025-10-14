import { TextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  error?: boolean;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
}
