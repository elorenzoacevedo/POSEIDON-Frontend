import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { InventoryData, searchCategory } from '@/backend/database-operations';

interface HeaderBarProps {
  setItems: React.Dispatch<React.SetStateAction<InventoryData[]>>;
}

const HeaderBar = (props: HeaderBarProps) => {
  const { setItems } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentCategory, setCurrentCategory] = useState('Category');

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getItemsByCategory = async (category: string) => {
    const data = await searchCategory(category);
    setItems(data);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    getItemsByCategory(category);
    handleClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#EEEEEE',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
        }}
      >
        <Button
          onClick={handleCategoryClick}
          sx={{ color: 'black', textTransform: 'none' }}
        >
          <Typography variant='h6' sx={{ marginLeft: '0.625rem' }}>
            {currentCategory}
          </Typography>
          <ArrowDropDownIcon sx={{ marginTop: '0.313rem' }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleCategoryChange('All')}>All</MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Food & Drink')}>
            Food & Drink
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Technology')}>
            Technology
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Office Supplies')}>
            Office Supplies
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Cleaning Supplies')}>
            Cleaning Supplies
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Hygiene')}>
            Hygiene
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Decoration')}>
            Decoration
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('Appliances')}>
            Appliances
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default HeaderBar;
