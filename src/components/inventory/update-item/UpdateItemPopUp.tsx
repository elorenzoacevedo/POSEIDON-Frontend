import { InventoryData } from '@/backend/database-operations';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import UpdateItemForm from './UpdateItemForm';
import { updateItem } from '@/backend/database-operations';
import { useEffect, useState } from 'react';

interface UpdateItemPopUpProps {
  updateItemPopUpClose: () => void;
  updateItemOpen: boolean;
  fetchItems: () => Promise<void>;
  selectedItem: InventoryData | null;
}

const UpdateItemPopUp = (props: UpdateItemPopUpProps) => {
  const { updateItemPopUpClose, updateItemOpen, fetchItems, selectedItem } =
    props;
  let data = selectedItem as InventoryData;
  const [formValues, setFormValues] = useState(data);
  const [formErrors, setFormErrors] = useState({
    nameError: '',
    categoryError: '',
    serialNumberError: '',
  });

  useEffect(() => {
    if (!selectedItem) {
        return;
    }
    
    data = selectedItem as InventoryData;
    data.serialNumber = data.serialNumber ? data.serialNumber : '';
    setFormValues(data);
  }, [selectedItem]);

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormValues({ ...formValues, [fieldName]: e.target.value });
  };

  const resetFormErrors = () => {
    setFormErrors({ nameError: '', categoryError: '', serialNumberError: '' });
  };

  const updateItemFormProps = {
    formValues,
    handleTextFieldChange,
    formErrors,
    setFormErrors,
  };

  const sendData = async () => {
    try {
      const response = await updateItem(formValues);
      console.log(response);
      fetchItems();
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const handleSubmit = () => {
    let submitErrors = {
      nameError: '',
      categoryError: '',
      serialNumberError: '',
    };

    if (
      formValues.category === 'Technology' &&
      formValues.serialNumber === ''
    ) {
      submitErrors.serialNumberError = 'Serial required for this item';
    }

    if (formValues.name === '') {
      submitErrors.nameError = 'Name is required';
    }

    if (formValues.category === 'Select') {
      submitErrors.categoryError = 'Category is required';
    }

    let isValidSubmission = true;

    Object.values(submitErrors).forEach((value) => {
      if (value !== '') {
        isValidSubmission = false;
        return;
      }
    });

    if (!isValidSubmission) {
      setFormErrors(submitErrors);
      return;
    }

    sendData();
    updateItemPopUpClose();
    resetFormErrors();
  };

  const handleClose = () => {
    updateItemPopUpClose();
    resetFormErrors();
  }

  return (
    <Dialog
      open={updateItemOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
      }}
    >
      <DialogTitle>Update Item</DialogTitle>
      <DialogContent>
        {selectedItem ? (
          <UpdateItemForm {...updateItemFormProps} />
        ) : (
          <Typography variant='body1' color='error'>
            No item selected.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {selectedItem ? <Button onClick={handleSubmit}>Submit</Button> : <></>}
      </DialogActions>
    </Dialog>
  );
};

export default UpdateItemPopUp;
