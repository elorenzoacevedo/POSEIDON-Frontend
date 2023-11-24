import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SideMenu from '@/components/inventory/SideMenu';
import HeaderBar from '@/components/inventory/HeaderBar';
import DynamicTable from '@/components/inventory/DynamicTable';
import { InventoryData, getAllItems } from '@/backend/database-operations';

const Inventory = () => {
  const [items, setItems] = useState<Array<InventoryData>>([]);
  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  const sideMenuProps = { fetchItems };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box>
      <Box sx={{ backgroundColor: '#A2E3FF', width: '100%', height: '2rem' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SideMenu {...sideMenuProps}/>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <HeaderBar />
          <DynamicTable items={items} />
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
