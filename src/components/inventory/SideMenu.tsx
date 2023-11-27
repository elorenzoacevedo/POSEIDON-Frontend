import { Box, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import UpdateIcon from '@mui/icons-material/Update';
import { useState } from 'react';
import AddItemPopUp from './add-item/AddItemPopUp';
import RestockItemPopUp from './restock-item/RestockItemPopUp';
import { InventoryData } from '@/backend/database-operations';
import UpdateItemPopUp from './update-item/UpdateItemPopUp';

interface SideMenuProps {
  fetchItems: () => Promise<void>;
  selectedItem: InventoryData | null;
}

const SideMenu = (props: SideMenuProps) => {
  const { fetchItems, selectedItem } = props;
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [restockItemOpen, setRestockItemOpen] = useState(false);
  const [updateItemOpen, setUpdateItemOpen] = useState(false);

  const addItemPopUpOpen = () => {
    setAddItemOpen(true);
  };

  const addItemPopUpClose = () => {
    setAddItemOpen(false);
  };

  const restockItemPopUpOpen = () => {
    setRestockItemOpen(true);
  };

  const restockItemPopUpClose = () => {
    setRestockItemOpen(false);
  };

  const updateItemPopUpOpen = () => {
    setUpdateItemOpen(true);
  };

  const updateItemPopUpClose = () => {
    setUpdateItemOpen(false);
  };

  const addItemPopUpProps = { addItemPopUpClose, addItemOpen, fetchItems };
  const restockItemPopUpProps = { restockItemPopUpClose, restockItemOpen, fetchItems };
  const updateItemPopUpProps = { updateItemPopUpClose, updateItemOpen, selectedItem, fetchItems };

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
      <Tooltip title='Add item' placement='right'>
        <AddIcon
          sx={{
            fontSize: '3rem',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#C4EDFF' },
            marginBottom: '0.313rem',
          }}
          onClick={addItemPopUpOpen}
        />
      </Tooltip>
      <Tooltip title='Restock' placement='right'>
        <TuneIcon
          sx={{
            fontSize: '3rem',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#C4EDFF' },
            marginBottom: '0.313rem',
          }}
          onClick={restockItemPopUpOpen}
        />
      </Tooltip>
      <Tooltip title='Update item' placement='right'>
        <UpdateIcon
          sx={{
            fontSize: '3rem',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#C4EDFF' },
            marginBottom: '0.313rem',
          }}
          onClick={updateItemPopUpOpen}
        />
      </Tooltip>
      <RestockItemPopUp {...restockItemPopUpProps}/>
      <AddItemPopUp {...addItemPopUpProps} />
      <UpdateItemPopUp {...updateItemPopUpProps}/>
    </Box>
  );
};

export default SideMenu;
