import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LayoutRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const MainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 auto',
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutRoot>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutRoot>
  );
};

export default Layout; 