import { decreaseItemQuantity, getItemByBarcode } from '@/backend/database-operations';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PaymentMethodPopup from './PaymentMethodPopup';
import PrintInvoicePopup from './PrintInvoicePopup';

interface InventoryData {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  barcode: string;
}

const CreateOrder = () => {
  const [items, setItems] = useState<InventoryData[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [barcode, setBarcode] = useState('');
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [printInvoicePopupOpen, setPrintInvoicePopupOpen] = useState(false);
  const [savedOrderNumber, setSavedOrderNumber] = useState<number | null>(null);

  const fetchItem = async (barcode: string) => {
    try {
      const item = await getItemByBarcode(barcode);
      if (!item) {
        console.log("No item associated with the provided barcode");
        return null;
      }
      return item;
    } catch (error) {
      console.error('Error fetching item:', error);
      return null;
    }
  };

  const saveOrder = async (order: { purchases: { item: any, itemName: string, quantity: number }[], paymentMethod: string, total: number }) => {
    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const item = await fetchItem(barcode);
        if (item) {
          console.log("Item fetched successfully");
          const existingItemIndex = items.findIndex(i => i.barcode === item.barcode);
          if (existingItemIndex !== -1) {
            const newItems = [...items];
            newItems[existingItemIndex].quantity += 1;
            setItems(newItems);
          } else {
            setItems(oldItems => [...oldItems, { ...item, quantity: 1 }]);
          }
        }
        setBarcode('');
      } else {
        setBarcode(barcode + event.key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [items, fetchItem, barcode]);

  const handlePaymentConfirm = async (method: string) => {
    console.log('Handling payment confirm:', method);
    setPaymentMethod(method);
    setPaymentPopupOpen(false);
    const order = {
      purchases: items.map((item) => ({ item, itemName: item.name, quantity: item.quantity })),
      paymentMethod: method,
      total: total,
    };
    console.log('Order to save:', order);
    const savedOrder = await saveOrder(order);
    console.log('Saved order:', savedOrder);
    if (savedOrder) {
      setSavedOrderNumber(savedOrder.orderNumber);
      setPrintInvoicePopupOpen(true);
      for (const item of items) {
        try {
          await decreaseItemQuantity(item.barcode, item.quantity);
        } catch (error) {
          console.error(`Error decreasing quantity of item ${item.barcode}:`, error);
        }
      }
      setItems([]);
    }
  };

  const handlePrintInvoice = async () => {
    if (!savedOrderNumber) {
      console.error('No order to print invoice for');
      return;
    }

    try {
      const invoiceResponse = await fetch(`http://localhost:8080/orders/${savedOrderNumber}/invoice`);

      if (!invoiceResponse.ok) {
        throw new Error(`HTTP error! status: ${invoiceResponse.status}`);
      }

      const invoiceData = await invoiceResponse.text();
      console.log(invoiceData);
    } catch (error) {
      console.error('Error printing invoice:', error);
    }

    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 2,
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(90deg, #DDDD5 50%, white 60%)'
    }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ border: '1px solid lightgray', borderRadius: '5px', width: '60%', minHeight: '100vh', padding: '10px' }}>
          <Typography variant="h3" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Helvetica', marginBottom: '20px', marginLeft: '20px' }}>
            Order Summary
          </Typography>
          {items.flatMap((item, index) =>
            Array.from({ length: item.quantity }).map((_, i) => (
              <Box key={`${index}-${i}`} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginLeft: '25px', padding: '10px', border: '1px solid lightgray', borderRadius: '5px', width: '500px', backgroundColor: 'white' }}>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Helvetica' }}>
                  {item.name}  {item.brand}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ fontFamily: 'Helvetica', marginLeft: 'auto', fontWeight: 'bold' }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginRight: 25 }}>
        <Grid container direction="column" alignItems="center" gap={2}>
          <Grid item>
            <Image src="/poseidon_logo.png" alt="Poseidon Logo" width={200} height={200} />
          </Grid>
          <Grid item>
            <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Helvetica' }}>
              Total: ${total.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setPaymentPopupOpen(true)}
              sx={{ fontSize: '20px', padding: '20px', minWidth: '200px' }}
              disabled={items.length === 0}
            >
              CHECKOUT
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="button"
              onClick={() => setItems([])}
              sx={{ fontSize: '20px', padding: '20px', minWidth: '200px' }}
              disabled={items.length === 0}
            >
              CANCEL ORDER
            </Button>
          </Grid>
        </Grid>
        <PaymentMethodPopup
          open={paymentPopupOpen}
          onClose={() => setPaymentPopupOpen(false)}
          onConfirm={handlePaymentConfirm}
        />
        <PrintInvoicePopup
          open={printInvoicePopupOpen}
          onClose={() => setPrintInvoicePopupOpen(false)}
          onConfirm={handlePrintInvoice}
        />
      </Box>
    </Box>
  );
};

export default CreateOrder;