import { Grid, TextField, MenuItem, Button } from '@mui/material';

export interface FormValues {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  serialNumber?: string;
}

interface FormErrors {
  nameError: string;
  categoryError: string;
  serialNumberError: string;
}

interface AddItemFormProps {
  formValues: FormValues;
  formErrors: FormErrors;
  handleTextFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
  setFormErrors: React.Dispatch<
    React.SetStateAction<{
      nameError: string;
      categoryError: string;
      serialNumberError: string;
    }>
  >;
  handleSubmit: () => void;
}

const AddItemForm = (props: AddItemFormProps) => {
  const {
    formValues,
    formErrors,
    handleTextFieldChange,
    setFormErrors,
    handleSubmit,
  } = props;

  return (
    <>
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
            disabled={formValues.category === 'Technology'}
            defaultValue={1}
            value={formValues.category === 'Technology' ? 1 : formValues.quantity}
            inputProps={{ inputMode: 'numeric', min: 0 }}
            onChange={(e) => handleTextFieldChange(e, 'quantity')}
          />
        </Grid>
        <Grid item>
          <TextField
            label='Price'
            type='number'
            defaultValue={0}
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
      <Button
        onClick={handleSubmit}
        size='large'
        sx={{ position: 'relative', left: '80%' }}
      >
        Submit
      </Button>
    </>
  );
};

export default AddItemForm;
