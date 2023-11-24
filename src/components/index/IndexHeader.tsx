import { Box, Typography } from '@mui/material';

const IndexHeader = () => (
  <Box
    sx={{
      bgcolor: '#4E55FF',
      height: '4rem',
      marginTop: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant='h4' color='white'>
      MANAGE
    </Typography>
  </Box>
);

export default IndexHeader;
