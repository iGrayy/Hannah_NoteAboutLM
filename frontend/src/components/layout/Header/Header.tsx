import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Settings, User, Lock, Grid3X3, ArrowLeft } from 'lucide-react';
import { HeaderProps } from './Header.types';
import { Button } from '../../common';
import { useTheme } from '../../../contexts';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
});

export const Header: React.FC<HeaderProps> = ({
  title = 'Hannah',
  subtitle = 'Learn About',
  onNavigateHome,
  onOpenSettings,
  actions,
  showBackButton = false,
  onBack,
}) => {
  const { theme: currentTheme, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', height: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showBackButton && onBack && (
            <IconButton onClick={onBack} edge="start">
              <ArrowLeft />
            </IconButton>
          )}
          <Button
            variant="text"
            onClick={onNavigateHome}
            sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
          >
            <Typography variant="h5" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GradientText>{title}</GradientText>
              <Typography component="span" color="text.secondary">
                {subtitle}
              </Typography>
            </Typography>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {actions}
          <Button variant="outlined" size="small" icon={<Lock size={16} />}>
            Share
          </Button>
          <IconButton onClick={onOpenSettings}>
            <Settings size={20} />
          </IconButton>
          <IconButton>
            <Grid3X3 size={20} />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <User size={18} />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={toggleTheme}>
              Toggle Theme ({currentTheme})
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
