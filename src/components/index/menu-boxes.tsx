import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const InventoryBox = () => {
  const router = useRouter();
  const handleInventoryClick = () => {
    router.push('/inventory');
  };

  return (
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
      <Typography variant='h5' color='white' sx={{ marginTop: '0.313rem' }}>
        INVENTORY
      </Typography>
    </Box>
  );
};

export const BillingBox = () => {
    const router = useRouter();
    const handleBillingClick = () => {
        router.push('/billing');
      };
      
  return (
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
      <Typography variant='h5' color='white' sx={{ marginTop: '0.825rem' }}>
        BILLING
      </Typography>
    </Box>
  );
};
