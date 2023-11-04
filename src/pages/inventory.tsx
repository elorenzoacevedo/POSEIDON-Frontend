import { Box, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const Inventory = () => {
  return (
    <Box>
      <Box sx={{ backgroundColor: '#A2E3FF', width: '100%', height: '2rem' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/*Menu Bar*/}
        <Box
          sx={{
            backgroundColor: '#E6F8FF',
            width: '3rem',
            padding: '0.313rem',
            height: 'calc(100vh - 4rem - 2rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <AddIcon
            sx={{
              fontSize: '3rem',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#C4EDFF' },
              marginBottom: '0.313rem',
            }}
          />
          <TuneIcon
            sx={{
              fontSize: '3rem',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#C4EDFF' },
            }}
          />
        </Box>
        {/*Header bar*/}
        <Box
          sx={{
            backgroundColor: '#EEEEEE',
            width: '100%',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#E8E8E8' },
            }}
          >
            <Typography variant='h6' sx={{ marginLeft: '0.625rem' }}>
              Category
            </Typography>
            <ArrowDropDownIcon sx={{ marginTop: '0.313rem' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              placeholder='quick search...'
              sx={{
                backgroundColor: 'white',
                color: '#9F9C9C',
                '& .MuiInputBase-input': {
                  padding: '0.3rem',
                },
              }}
            />
            <SearchIcon sx={{ mt: '0.313rem', ml: '0.313rem' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
