import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  const handleInventoryClick = () => {
    router.push('/inventory');
  };

  const handleBillingClick = () => {
    router.push('/billing');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/*Header*/}
      <Box sx={{ width: '60%' }}>
        <Box
          sx={{
            bgcolor: '#4E55FF',
            height: '4rem',
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h4' color='white'>
            MANAGE
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginTop: '2rem', flex: '1' }}>
          {/*Inventory box*/}
          <Box
            sx={{
              flex: '1',
              marginRight: '1rem',
              padding: '0.5rem',
              bgcolor: '#4E55FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleInventoryClick}
          >
            <Image src='/box.png' alt='Inventory' width={200} height={200} />
            <Typography
              variant='h5'
              color='white'
              sx={{ marginTop: '0.313rem' }}
            >
              INVENTORY
            </Typography>
          </Box>
          {/*Billing Box*/}
          <Box
            sx={{
              flex: '1',
              marginLeft: '1rem',
              bgcolor: '#4E55FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleBillingClick}
          >
            <Image src='/bill.png' alt='Billing' width={200} height={200} />
            <Typography
              variant='h5'
              color='white'
              sx={{ marginTop: '0.825rem' }}
            >
              BILLING
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#0D0A9A',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          height: '4rem'
        }}
      >
        <Typography variant='body1' color='white'>
          (c) 2023 All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
