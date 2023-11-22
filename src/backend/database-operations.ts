export interface InventoryData {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  serial_number?: string;
}

export interface InventoryDataResponse {
  status: number;
  message: Array<InventoryData>;
}

export async function getAllItems(): Promise<Array<InventoryData>> {
    try {
      const response = await fetch('http://localhost:8080/items');
      const data = await response.json();
      if (!!data && !!data.status && data.status === 200) {
        return data.message != null ? data.message : [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  }
