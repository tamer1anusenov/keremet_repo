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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import whiteLogo from '../../assets/images/whitelogo.png';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#00A6B4',
  boxShadow: 'none',
  padding: '8px 0',
});

const LogoImage = styled('img')({
  height: '40px',
  marginRight: '20px',
});

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  padding: '6px 16px',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderColor: '#fff',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  padding: '6px 16px',
  fontSize: '0.9rem',
  textTransform: 'none',
  border: '1px solid #fff',
}));

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  gap: '8px',
});

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    handleClose();
    navigate('/');
  };

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Врачи', path: '/doctors' },
    { label: 'Записаться на прием', path: '/appointment' },
    { label: 'Анализы', path: '/tests' },
    { label: 'О нас', path: '/about' },
    { label: 'Контакты', path: '/contacts' },
  ];

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: '64px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
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
                    onClick={() => {
                      navigate(item.path);
                      handleClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                {!isLoggedIn ? (
                  <>
                    <MenuItem onClick={() => {
                      navigate('/login');
                      handleClose();
                    }}>
                      Войти
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate('/register');
                      handleClose();
                    }}>
                      Регистрация
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => {
                      navigate('/profile');
                      handleClose();
                    }}>
                      Личный кабинет
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      Выйти
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                justifyContent: 'center',
                gap: '8px'
              }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.path}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>

              {!isLoggedIn ? (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <AuthButton onClick={() => navigate('/login')}>
                    Войти
                  </AuthButton>
                  <AuthButton
                    className="outlined"
                    onClick={() => navigate('/register')}
                  >
                    Регистрация
                  </AuthButton>
                </Box>
              ) : (
                <UserInfo>
                  <AuthButton 
                    className="outlined"
                    onClick={() => navigate('/profile')}
                  >
                    Личный кабинет
                  </AuthButton>
                  <AuthButton 
                    className="outlined"
                    onClick={handleLogout}
                  >
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