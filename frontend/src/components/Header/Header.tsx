import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import whiteLogo from '../../assets/images/whitelogo.png';
import { useAuth } from '../../hooks/useAuth';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#00A6B4',
  boxShadow: 'none',
});

const LogoImage = styled('img')({
  height: '40px',
  marginRight: '20px',
});

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  marginLeft: theme.spacing(1),
  borderColor: '#fff',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Врачи', path: '/doctors' },
    { label: 'Записаться на прием', path: '/appointment' },
    { label: 'Анализы', path: '/tests' },
    { label: 'Контакты', path: '/contacts' },
    { label: 'О нас', path: '/about' },
  ];

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/">
            <LogoImage src={whiteLogo} alt="Керемет" />
          </Link>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ marginLeft: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                {!user ? (
                  <>
                    <MenuItem onClick={() => handleMenuItemClick('/login')}>
                      Войти
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/register')}>
                      Регистрация
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={logout}>Выйти</MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.path}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>

              {!user ? (
                <Box>
                  <AuthButton variant="text" onClick={() => navigate('/login')}>
                    Войти
                  </AuthButton>
                  <AuthButton
                    variant="outlined"
                    onClick={() => navigate('/register')}
                  >
                    Регистрация
                  </AuthButton>
                </Box>
              ) : (
                <UserInfo>
                  <Typography variant="body1" sx={{ color: '#fff', mr: 2 }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Avatar
                    sx={{ width: 32, height: 32, mr: 2 }}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AuthButton variant="outlined" onClick={logout}>
                    Выйти
                  </AuthButton>
                </UserInfo>
              )}
            </>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header; 