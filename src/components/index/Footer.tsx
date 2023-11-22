import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      bgcolor: '#0D0A9A',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      height: '4rem',
    }}
  >
    <Typography variant='body1' color='white'>
      (c) 2023 All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
