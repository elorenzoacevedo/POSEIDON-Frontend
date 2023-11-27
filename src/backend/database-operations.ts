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

const categoryPaths: Record<string, string> = {
  'Food & Drink': 'Food%20%26%20Drink',
  Technology: 'Technology',
  'Office Supplies': 'Office%20Supplies',
  'Cleaning Supplies': 'Cleaning%20Supplies',
  Hygiene: 'Hygiene',
  Decoration: 'Decoration',
  Appliances: 'Appliances',
};

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

export async function searchCategory(
  category: string
): Promise<Array<InventoryData>> {
  if (category === 'All') {
    return getAllItems();
  }

  const apiPath = `http://localhost:8080/items/search-category?category=${categoryPaths[category]}`;
  try {
    const response = await fetch(apiPath);
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

export async function searchItemByBarcode(
  barcode: string
): Promise<InventoryData | null> {
  const apiPath = `http://localhost:8080/items/${barcode}`;
  try {
    const response = await fetch(apiPath);
    const data = await response.json();
    if (!!data && !!data.status && data.status === 200) {
      return data.message != null ? data.message : null;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function updateItem(
  item: InventoryData
): Promise<InventoryDataResponse> {
  const apiPath = `http://localhost:8080/items/${item.barcode}`;
  return fetch(apiPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}

export async function deleteItem(
  barcode: string
): Promise<InventoryDataResponse> {
  const apiPath = `http://localhost:8080/items/${barcode}`;

  return fetch(apiPath, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
