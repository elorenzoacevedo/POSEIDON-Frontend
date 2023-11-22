import { InventoryData, InventoryDataResponse } from '@/backend/database-operations';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

export interface DynamicTableProps {
  items: Array<InventoryData>
}

const columns: GridColDef[] = [
  {
    field: 'barcode',
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>Barcode</strong>,
  },
  {
    field: 'name',
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>Name</strong>,
  },
  {
    field: 'brand',
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>Brand</strong>,
  },
  {
    field: 'category',
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>Category</strong>,
  },
  {
    field: 'quantity',
    type: 'number',
    width: 100,
    renderHeader: (params: GridColumnHeaderParams) => <strong>Quantity</strong>,
  },
  {
    field: 'price',
    type: 'number',
    width: 100,
    renderHeader: (params: GridColumnHeaderParams) => <strong>Price</strong>,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return '';
      }
      return `$${params.value.toFixed(2)}`;
    },
  },
  {
    field: 'serial_number',
    width: 250,
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>Serial Number</strong>
    ),
  },
];

function getRowBarcode(row: InventoryData): string {
  return row.barcode;
}

const DynamicTable = (props: DynamicTableProps) => {
  const { items } = props;

  return (
    <Box sx={{ height: 'calc(100vh - 8.4rem)', width: '100%' }}>
      <DataGrid
        disableColumnMenu
        getRowId={getRowBarcode}
        rows={items}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
};

export default DynamicTable;
