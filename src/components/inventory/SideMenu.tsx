import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { useState, useEffect } from 'react';
import AddItemPopUp from './AddItemPopUp';

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  const addItemPopUpOpen = () => {
    setOpen(true);
  };

  const addItemPopUpClose = () => {
    setOpen(false);
  };

  const addItemPopUpProps = { addItemPopUpClose, open };

  return (
    <Box
      sx={{
        backgroundColor: '#E6F8FF',
        width: '3rem',
        padding: '0.313rem',
        height: 'calc(100vh - 4rem - 2rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AddIcon
        sx={{
          fontSize: '3rem',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#C4EDFF' },
          marginBottom: '0.313rem',
        }}
        onClick={addItemPopUpOpen}
      />
      <TuneIcon
        sx={{
          fontSize: '3rem',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#C4EDFF' },
        }}
      />
      <AddItemPopUp {...addItemPopUpProps} />
    </Box>
  );
};

export default SideMenu;