import React, { useState } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  return (
    <AppBar position='static' sx={styles.appBar}>
      <Toolbar>
        <Box sx={styles.logo}>
          <Image src='/poseidon_logo.png' alt='Logo' width='55' height='55' />
        </Box>
        <Typography variant='h4' sx={styles.title}>
          POSEIDON
        </Typography>
        <IconButton
          edge='end'
          sx={styles.menuIcon}
          aria-label='menu'
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/inventory')}>
            Inventory
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/billing')}>
            Billing
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
