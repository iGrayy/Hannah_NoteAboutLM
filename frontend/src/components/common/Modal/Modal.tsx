import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { X } from 'lucide-react';
import { ModalProps } from './Modal.types';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    minWidth: 300,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'auto',
  flex: 1,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.grey[600],
    },
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 1,
}));

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  actions,
  onClose,
  showCloseButton = true,
  size = 'sm',
  loading = false,
  open,
  ...props
}) => {
  return (
    <StyledDialog
      {...props}
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth
    >
      {title && (
        <StyledDialogTitle>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {showCloseButton && onClose && (
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ ml: 1 }}
            >
              <X size={20} />
            </IconButton>
          )}
        </StyledDialogTitle>
      )}
      
      <StyledDialogContent>
        {loading && (
          <LoadingOverlay>
            <CircularProgress />
          </LoadingOverlay>
        )}
        {children}
      </StyledDialogContent>
      
      {actions && (
        <StyledDialogActions>
          {actions}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};

export default Modal;
