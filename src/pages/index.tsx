import { Box } from '@mui/material';
import React from 'react';
import IndexHeader from '@/components/index/IndexHeader';
import { BillingBox, InventoryBox } from '@/components/index/menu-boxes';
import Footer from '@/components/index/Footer';

const Index = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box sx={{ width: '60%' }}>
        <IndexHeader />
        <Box sx={{ display: 'flex', marginTop: '2rem', flex: '1' }}>
          <InventoryBox />
          <BillingBox />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Index;
