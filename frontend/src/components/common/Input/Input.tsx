import React, { useState, useCallback } from 'react';
import { 
  TextField, 
  InputAdornment, 
  Box, 
  Typography,
  CircularProgress 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputProps } from './Input.types';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
      },
    },
  },
}));

const CharCountWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(0.5),
}));

export const Input: React.FC<InputProps> = ({
  startIcon,
  endIcon,
  loading = false,
  maxLength,
  showCharCount = false,
  value,
  onChange,
  helperText,
  error,
  variant = 'outlined',
  ...props
}) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (maxLength && newValue.length > maxLength) {
      return; // Prevent input if max length exceeded
    }
    
    setCharCount(newValue.length);
    
    if (onChange) {
      onChange(event);
    }
  }, [maxLength, onChange]);

  const startAdornment = startIcon || loading ? (
    <InputAdornment position="start">
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        startIcon
      )}
    </InputAdornment>
  ) : undefined;

  const endAdornment = endIcon ? (
    <InputAdornment position="end">
      {endIcon}
    </InputAdornment>
  ) : undefined;

  const shouldShowCharCount = showCharCount && maxLength;
  const isNearLimit = maxLength && charCount > maxLength * 0.8;

  return (
    <Box>
      <StyledTextField
        {...props}
        variant={variant}
        value={value}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment,
          endAdornment,
          ...props.InputProps,
        }}
        inputProps={{
          maxLength,
          ...props.inputProps,
        }}
      />
      
      {shouldShowCharCount && (
        <CharCountWrapper>
          <Typography
            variant="caption"
            color={isNearLimit ? 'error' : 'textSecondary'}
          >
            {charCount}/{maxLength}
          </Typography>
        </CharCountWrapper>
      )}
    </Box>
  );
};

export default Input;
