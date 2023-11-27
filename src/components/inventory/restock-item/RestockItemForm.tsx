import { InventoryData } from '@/backend/database-operations';
import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { updateItem } from '@/backend/database-operations';

interface RestockItemFormProps {
  item: InventoryData | null;
  restockItemPopUpClose: () => void;
  hideRestockItemForm: () => void;
  fetchItems: () => void;
}

const RestockItemForm = (props: RestockItemFormProps) => {
  const { item, restockItemPopUpClose, hideRestockItemForm, fetchItems } =
    props;
  const [quantity, setQuantity] = useState(0);
  const [formErrors, setFormErrors] = useState({
    quantityError: '',
  });
  const handleQuantityChange = (num: number) => {
    setQuantity(num);
  };
  const handleSubmit = async () => {
    if (!item) {
      return;
    }

    if (quantity < 0) {
      setFormErrors({ quantityError: 'Quantity cannot be negative' });
      return;
    }

    const newItem = {
      barcode: item.barcode,
      name: item.name,
      brand: item.brand,
      category: item.category,
      quantity: item.quantity + quantity,
      price: item.price,
      serialNumber: item.serialNumber,
    };
    const response = await updateItem(newItem);
    if (response.status !== 200) {
      console.error('Error restocking item:', response.message);
    }
    fetchItems();
    restockItemPopUpClose();
    hideRestockItemForm();
  };
  return (
    <>
      <Grid container mt='0.5rem' spacing={2}>
        <Grid item>
          <TextField label='Barcode' value={item?.barcode} disabled />
        </Grid>
        <Grid item>
          <TextField
            label='Quantity'
            type='number'
            defaultValue={0}
            inputProps={{ inputMode: 'numeric', min: 0 }}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            onBlur={() => {
              if (quantity < 0) {
                setFormErrors({
                  ...formErrors,
                  quantityError: 'Quantity cannot be negative',
                });
                return;
              }
              setFormErrors({ quantityError: '' });
            }}
            error={formErrors.quantityError !== ''}
            helperText={formErrors.quantityError}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RestockItemForm;
