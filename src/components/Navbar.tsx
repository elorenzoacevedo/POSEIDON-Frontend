import React from 'react';
import Image from 'next/image';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const styles = {
  appBar: {
    backgroundColor: '#0D0A9A',
  },
  logo: {
    marginRight: '16px',
  },
  title: {
    color: 'white',
    flexGrow: 1,
  },
  menuIcon: {
    color: 'white',
  },
};

const NavBar = () => {
  return (
    <AppBar position='static' sx={styles.appBar}>
      <Toolbar>
        {/* Logo */}
        <Box sx={styles.logo}>
          <Image src='/poseidon_logo.png' alt='Logo' width='55' height='55' />
        </Box>
        <Typography variant='h4' sx={styles.title}>
          POSEIDON
        </Typography>
        <IconButton edge='end' sx={styles.menuIcon} aria-label='menu'>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
