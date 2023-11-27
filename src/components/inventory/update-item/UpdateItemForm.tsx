import { InventoryData } from '@/backend/database-operations';
import { Grid, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

interface FormErrors {
  nameError: string;
  categoryError: string;
  serialNumberError: string;
}

interface UpdateItemFormProps {
  handleTextFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
  formValues: InventoryData;
  formErrors: FormErrors;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

const UpdateItemForm = (props: UpdateItemFormProps) => {
  const { handleTextFieldChange, formValues, formErrors, setFormErrors } =
    props;

  return (
    <Grid container mt='0.5rem' spacing={2}>
      <Grid item>
        <TextField label='Barcode' value={formValues.barcode} disabled />
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
          <MenuItem value='Cleaning Supplies'>Cleaning Supplies</MenuItem>
          <MenuItem value='Decoration'>Decoration</MenuItem>
          <MenuItem value='Appliances'>Appliances</MenuItem>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          label='Quantity'
          type='number'
          disabled
          defaultValue={formValues.quantity}
          inputProps={{ inputMode: 'numeric', min: 0 }}
          onChange={(e) => handleTextFieldChange(e, 'quantity')}
        />
      </Grid>
      <Grid item>
        <TextField
          label='Price'
          type='number'
          defaultValue={formValues.price}
          inputProps={{ inputMode: 'numeric', step: '0.01', min: 0 }}
          onChange={(e) => handleTextFieldChange(e, 'price')}
        />
      </Grid>
      <Grid item>
        <TextField
          label='Serial Number'
          value={formValues.serialNumber}
          onChange={(e) => handleTextFieldChange(e, 'serialNumber')}
          onBlur={() => {
            if (
              formValues.category === 'Technology' &&
              formValues.serialNumber === ''
            ) {
              setFormErrors({
                ...formErrors,
                serialNumberError: 'Serial required for this item',
              });
              return;
            }
            setFormErrors({ ...formErrors, serialNumberError: '' });
          }}
          error={formErrors.serialNumberError !== ''}
          helperText={formErrors.serialNumberError}
        />
      </Grid>
    </Grid>
  );
};

export default UpdateItemForm;
