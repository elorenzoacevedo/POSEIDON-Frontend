import { Box, TextField, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

const HeaderBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#EEEEEE',
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
  );
};

export default HeaderBar;
