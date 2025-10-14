import React from 'react';
import { Button as MuiButton, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ButtonProps } from './Button.types';

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !['loading', 'iconPosition'].includes(prop as string),
})<ButtonProps>(({ theme, variant, loading }) => ({
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
  
  ...(variant === 'gradient' && {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    },
  }),
  
  ...(loading && {
    color: 'transparent',
  }),
}));

const LoadingWrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const ContentWrapper = styled(Box)<{ iconPosition?: 'start' | 'end' }>(({ iconPosition }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexDirection: iconPosition === 'end' ? 'row-reverse' : 'row',
}));

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  icon,
  iconPosition = 'start',
  variant = 'contained',
  size = 'medium',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const buttonVariant = variant === 'gradient' ? 'contained' : variant;

  return (
    <StyledButton
      {...props}
      variant={buttonVariant}
      size={size}
      disabled={isDisabled}
      loading={loading}
      iconPosition={iconPosition}
    >
      {loading && (
        <LoadingWrapper>
          <CircularProgress
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            color="inherit"
          />
        </LoadingWrapper>
      )}
      
      <ContentWrapper iconPosition={iconPosition}>
        {icon && <Box component="span">{icon}</Box>}
        <Box component="span">{children}</Box>
      </ContentWrapper>
    </StyledButton>
  );
};

export default Button;
