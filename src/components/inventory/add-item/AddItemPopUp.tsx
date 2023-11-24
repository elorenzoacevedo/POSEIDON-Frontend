import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AddItemForm from './AddItemForm';
import { addItem } from '@/backend/database-operations';

interface AddItemPopUpProps {
  addItemPopUpClose: () => void;
  open: boolean;
  fetchItems: () => Promise<void>;
}

const AddItemPopUp = (props: AddItemPopUpProps) => {
  const { addItemPopUpClose, open, fetchItems } = props;
  const [itemBarcode, setBarcode] = useState('');
  const [showTextFields, setShowTextFields] = useState(false);
  const [formValues, setFormValues] = useState({
    barcode: '',
    name: '',
    brand: '',
    category: 'Select',
    quantity: 0,
    price: 0,
    serialNumber: '',
  });
  const [formErrors, setFormErrors] = useState({
    nameError: '',
    categoryError: '',
    serialNumberError: '',
  });

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormValues({ ...formValues, [fieldName]: e.target.value });
  };

  const resetFormValues = () => {
    setFormValues({
      barcode: '',
      name: '',
      brand: '',
      category: 'Select',
      quantity: 0,
      price: 0,
      serialNumber: '',
    });
    setBarcode('');
  };

  const resetFormErrors = () => {
    setFormErrors({ nameError: '', categoryError: '', serialNumberError: '' });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) {
        return;
      }

      const key = event.key;
      if (!showTextFields && key.match(/^[a-zA-Z0-9]$/)) {
        setBarcode(itemBarcode + key);
      }

      if (key === 'Enter') {
        setShowTextFields(true);
        setFormValues({ ...formValues, barcode: itemBarcode });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, itemBarcode, showTextFields]);

  //TODO: avoid fetching all items when a new item is added.
  const sendData = async () => {
    try {
      const response = await addItem(formValues);
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
    addItemPopUpClose();
    resetFormErrors();
    resetFormValues();
  };

  const addItemFormProps = {
    formErrors,
    setFormErrors,
    handleTextFieldChange,
    handleSubmit,
    formValues,
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          addItemPopUpClose();
          setTimeout(() => {
            setShowTextFields(false);
            resetFormErrors();
            resetFormValues();
          }, 300);
        }
      }}
    >
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        {showTextFields ? (
          <AddItemForm {...addItemFormProps} />
        ) : (
          <>
            <Typography>Scan the item barcode</Typography>
            <Image src='/scan.gif' width={450} height={200} alt='barcode' />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddItemPopUp;
