import { ReactNode } from 'react';

export interface LoadingProps {
  loading?: boolean;
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'linear' | 'skeleton' | 'dots';
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export interface SkeletonLoaderProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  lines?: number;
}
