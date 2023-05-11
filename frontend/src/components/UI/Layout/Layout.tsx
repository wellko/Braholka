import React from 'react';
import { Box, Container } from '@mui/material';
import AppToolbar from '../AppToolBar/AppToolBar';
import Footer from '../Footer/Footer';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="App">
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth={'xl'} component="main" sx={{ flex: 1, m: 'auto' }}>
        {children}
      </Container>
      <footer style={{ flexShrink: 0 }}>
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;
