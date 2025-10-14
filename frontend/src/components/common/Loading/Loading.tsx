import React from 'react';
import {
  CircularProgress,
  LinearProgress,
  Skeleton,
  Box,
  Typography,
  Backdrop,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { LoadingProps, SkeletonLoaderProps } from './Loading.types';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`;

const DotsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
});

const Dot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  animation: `${bounce} 1.4s ease-in-out infinite both`,
  '&:nth-of-type(1)': { animationDelay: '-0.32s' },
  '&:nth-of-type(2)': { animationDelay: '-0.16s' },
  '&:nth-of-type(3)': { animationDelay: '0s' },
}));

const LoadingContainer = styled(Box)<{ overlay?: boolean; fullScreen?: boolean }>(
  ({ theme, overlay, fullScreen }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    ...(overlay && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 1000,
    }),
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.background.default,
      zIndex: 9999,
    }),
  })
);

const DotsLoader: React.FC = () => (
  <DotsContainer>
    <Dot />
    <Dot />
    <Dot />
  </DotsContainer>
);

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
}) => {
  if (lines > 1) {
    return (
      <Box>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant={variant}
            width={width}
            height={height}
            sx={{ mb: index < lines - 1 ? 1 : 0 }}
          />
        ))}
      </Box>
    );
  }

  return <Skeleton variant={variant} width={width} height={height} />;
};

export const Loading: React.FC<LoadingProps> = ({
  loading = true,
  children,
  size = 'medium',
  variant = 'circular',
  text,
  fullScreen = false,
  overlay = false,
}) => {
  if (!loading && children) {
    return <>{children}</>;
  }

  if (!loading) {
    return null;
  }

  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const renderLoader = () => {
    switch (variant) {
      case 'linear':
        return <LinearProgress sx={{ width: '100%', maxWidth: 200 }} />;
      case 'dots':
        return <DotsLoader />;
      case 'skeleton':
        return <SkeletonLoader lines={3} />;
      default:
        return <CircularProgress size={getSize()} />;
    }
  };

  const content = (
    <LoadingContainer overlay={overlay} fullScreen={fullScreen}>
      {renderLoader()}
      {text && (
        <Typography variant="body2" color="textSecondary">
          {text}
        </Typography>
      )}
    </LoadingContainer>
  );

  if (fullScreen) {
    return (
      <Backdrop open={true} sx={{ zIndex: 9999 }}>
        {content}
      </Backdrop>
    );
  }

  return content;
};

export default Loading;
