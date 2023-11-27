import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import RestockItemForm from './RestockItemForm';
import {
  InventoryData,
  searchItemByBarcode,
} from '@/backend/database-operations';

interface RestockItemPopUpProps {
  restockItemPopUpClose: () => void;
  restockItemOpen: boolean;
  fetchItems: () => Promise<void>;
}

const RestockItemPopUp = (props: RestockItemPopUpProps) => {
  const { restockItemPopUpClose, restockItemOpen, fetchItems } = props;
  const [showRestockForm, setShowRestockForm] = useState(false);
  const [restockItemBarcode, setRestockItemBarcode] = useState('');
  const [item, setItem] = useState<InventoryData | null>(null);
  const hideRestockItemForm = () => {
    setTimeout(() => {
      setShowRestockForm(false);
      setRestockItemBarcode('');
    }, 300);
  };
  const restockItemFormProps = {
    item,
    restockItemPopUpClose,
    hideRestockItemForm,
    fetchItems,
  };

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!restockItemOpen) {
        return;
      }

      const key = event.key;
      if (!showRestockForm && key.match(/^[a-zA-Z0-9]$/)) {
        setRestockItemBarcode(restockItemBarcode + key);
      }

      if (key === 'Enter') {
        const response = await searchItemByBarcode(restockItemBarcode);
        if (!response) {
          console.log(`Item ${restockItemBarcode} not found.`);
          setRestockItemBarcode('');
          return;
        }
        setItem(response);
        setShowRestockForm(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [restockItemOpen, restockItemBarcode, showRestockForm]);

  return (
    <Dialog
      open={restockItemOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          restockItemPopUpClose();
          hideRestockItemForm();
        }
      }}
    >
      <DialogTitle>Restock Item</DialogTitle>
      <DialogContent>
        {showRestockForm ? (
          <RestockItemForm {...restockItemFormProps} />
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

export default RestockItemPopUp;
