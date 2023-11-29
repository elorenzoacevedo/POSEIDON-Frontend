import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

interface PrintInvoicePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PrintInvoicePopup: React.FC<PrintInvoicePopupProps> = ({ open, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Print Invoice</DialogTitle>
      <DialogContent>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PrintInvoicePopup;