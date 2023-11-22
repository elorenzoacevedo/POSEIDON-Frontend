import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Grid,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AddItemPopUpProps {
  addItemPopUpClose: () => void;
  open: boolean;
}

const AddItemPopUp = (props: AddItemPopUpProps) => {
  const { addItemPopUpClose, open } = props;
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
  });

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
        setFormValues({ ...formValues, ['barcode']: itemBarcode });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, itemBarcode, showTextFields]);

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormValues({ ...formValues, [fieldName]: e.target.value });
  };

  const handleSubmit = () => {
    // Access the formValues object to get the values of all TextFields
    console.log(formValues);
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

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          addItemPopUpClose();
          setTimeout(() => {
            setShowTextFields(false);
          }, 300);
        }
      }}
    >
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        {showTextFields ? (
          <>
            <Grid container mt='0.5rem' spacing={2}>
              <Grid item>
                <TextField label='Barcode' value={itemBarcode} disabled />
              </Grid>
              <Grid item>
                <TextField
                  label='Name'
                  required
                  value={formValues.name}
                  onChange={(e) => handleTextFieldChange(e, 'name')}
                  onBlur={() => {
                    if (formValues.name === '') {
                      setFormErrors({
                        ...formErrors,
                        nameError: 'Name is required',
                      });
                      return;
                    }
                    setFormErrors({ ...formErrors, nameError: '' });
                  }}
                  error={formErrors.nameError !== ''}
                  helperText={formErrors.nameError}
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Brand'
                  value={formValues.brand}
                  onChange={(e) => handleTextFieldChange(e, 'brand')}
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  required
                  label='Category'
                  value={formValues.category}
                  onChange={(e) => handleTextFieldChange(e, 'category')}
                  onBlur={() => {
                    if (formValues.category === 'Select') {
                      setFormErrors({
                        ...formErrors,
                        categoryError: 'Category is required',
                      });
                      return;
                    }
                    setFormErrors({ ...formErrors, categoryError: '' });
                  }}
                  error={formErrors.categoryError !== ''}
                  helperText={formErrors.categoryError}
                >
                  <MenuItem value='Select'>Select</MenuItem>
                  <MenuItem value='Technology'>Technology</MenuItem>
                  <MenuItem value='Office Supplies'>Office Supplies</MenuItem>
                  <MenuItem value='Food & Drink'>Food & Drink</MenuItem>
                  <MenuItem value='Hygiene'>Hygiene</MenuItem>
                  <MenuItem value='Cleaning Supplies'>
                    Cleaning Supplies
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label='Quantity'
                  type='number'
                  inputProps={{ inputMode: 'numeric', min: 0 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Price'
                  type='number'
                  inputProps={{ inputMode: 'numeric', step: '0.01', min: 0 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Serial Number'
                  value={formValues.serialNumber}
                  onChange={(e) => handleTextFieldChange(e, 'serialNumber')}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography>Scan the item barcode</Typography>
            <Image src='/scan.gif' width={450} height={200} alt='barcode' />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} size='large'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemPopUp;
