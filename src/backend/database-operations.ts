import { FormValues } from '@/components/inventory/add-item/AddItemForm';

export interface InventoryData {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  serialNumber?: string;
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

export async function addItem(
  formValues: FormValues
): Promise<InventoryDataResponse> {
  const apiPath =
    formValues.category === 'Technology'
      ? 'http://localhost:8080/items/electronics'
      : 'http://localhost:8080/items';

  return fetch(apiPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
