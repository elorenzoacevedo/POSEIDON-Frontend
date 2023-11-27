import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { InventoryData } from '@/backend/database-operations';
import { deleteItem } from '@/backend/database-operations';

interface DeleteItemPopUpProps {
  deleteItemPopUpClose: () => void;
  deleteItemOpen: boolean;
  fetchItems: () => Promise<void>;
  selectedItem: InventoryData | null;
}

const DeleteItemPopUp = (props: DeleteItemPopUpProps) => {
  const { deleteItemPopUpClose, deleteItemOpen, fetchItems, selectedItem } =
    props;

  const sendDelete = async () => {
    if (!selectedItem) {
      console.error('Error deleting item: no item selected');
      return;
    }

    try {
      const response = await deleteItem(selectedItem.barcode);
      console.log(response);
      fetchItems();
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleSubmit = () => {
    sendDelete();
    deleteItemPopUpClose();
  };
  return (
    <Dialog
      open={deleteItemOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          deleteItemPopUpClose();
        }
      }}
    >
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        {selectedItem ? (
          <>
            <Typography color='error'>
              Are sure you want to delete this item?
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Barcode: ${selectedItem.barcode}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Name: ${selectedItem.name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Brand: ${selectedItem.brand}`} />
              </ListItem>
              {selectedItem.serialNumber ? (
                <ListItem>
                  <ListItemText primary={`SN: ${selectedItem.serialNumber}`} />
                </ListItem>
              ) : (
                <></>
              )}
            </List>
          </>
        ) : (
          <Typography variant='body1' color='error'>
            No item selected.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteItemPopUpClose}>Cancel</Button>
        {selectedItem ? <Button onClick={handleSubmit}>Yes</Button> : <></>}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemPopUp;
