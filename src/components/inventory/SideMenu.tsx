import { Box, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import AddItemPopUp from './add-item/AddItemPopUp';
import RestockItemPopUp from './restock-item/RestockItemPopUp';
import { InventoryData } from '@/backend/database-operations';
import UpdateItemPopUp from './update-item/UpdateItemPopUp';
import DeleteItemPopUp from './delete-item/DeleteItemPopUp';

interface SideMenuProps {
  fetchItems: () => Promise<void>;
  selectedItem: InventoryData | null;
}

const SideMenu = (props: SideMenuProps) => {
  const { fetchItems, selectedItem } = props;
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [restockItemOpen, setRestockItemOpen] = useState(false);
  const [updateItemOpen, setUpdateItemOpen] = useState(false);
  const [deleteItemOpen, setDeleteItemOpen] = useState(false);

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

  const deleteItemPopUpOpen = () => {
    setDeleteItemOpen(true);
  };

  const deleteItemPopUpClose = () => {
    setDeleteItemOpen(false);
  };

  const addItemPopUpProps = { addItemPopUpClose, addItemOpen, fetchItems };
  const restockItemPopUpProps = { restockItemPopUpClose, restockItemOpen, fetchItems };
  const updateItemPopUpProps = { updateItemPopUpClose, updateItemOpen, selectedItem, fetchItems };
  const deleteItemPopUpProps = { deleteItemPopUpClose, deleteItemOpen, fetchItems, selectedItem };

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
      <Tooltip title='Edit item' placement='right'>
        <EditIcon
          sx={{
            fontSize: '3rem',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#C4EDFF' },
            marginBottom: '0.313rem',
          }}
          onClick={updateItemPopUpOpen}
        />
      </Tooltip>
      <Tooltip title='Delete item' placement='right'>
        <DeleteForeverIcon
          sx={{
            fontSize: '3rem',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#C4EDFF' },
            marginBottom: '0.313rem',
          }}
          onClick={deleteItemPopUpOpen}
        />
      </Tooltip>
      <RestockItemPopUp {...restockItemPopUpProps}/>
      <AddItemPopUp {...addItemPopUpProps} />
      <UpdateItemPopUp {...updateItemPopUpProps}/>
      <DeleteItemPopUp {...deleteItemPopUpProps}/>
    </Box>
  );
};

export default SideMenu;
