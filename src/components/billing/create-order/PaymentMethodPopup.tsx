import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface PaymentMethodPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
}

const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({ open, onClose, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setPaymentMethod(''); 
      setError(''); 
    }
  }, [open]);

  const handleConfirm = () => {
    if (paymentMethod) {
      onConfirm(paymentMethod);
      onClose();
    } else {
      setError('Please select a payment method');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ paddingBottom: '20px' }}>Select Payment Method</DialogTitle>
      <DialogContent>
        <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} fullWidth>
          <MenuItem value="debit">Debit Card</MenuItem>
          <MenuItem value="credit">Credit Card</MenuItem>
          <MenuItem value="cash">Cash</MenuItem>
        </Select>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>RETURN TO ORDER</Button>
        <Button onClick={handleConfirm}>Pay</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentMethodPopup;