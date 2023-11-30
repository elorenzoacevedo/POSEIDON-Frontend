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
  const apiPath =
    item.category === 'Technology'
      ? `http://localhost:8080/items/electronics/${item.barcode}`
      : `http://localhost:8080/items/${item.barcode}`;
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

export async function getItemByBarcode(barcode: string): Promise<InventoryData | null> {
  try {
    const response = await fetch(`http://localhost:8080/items/${barcode}`);
    const data = await response.json();
    if (!!data && !!data.status && data.status === 200) {
      return data.message != null ? data.message : null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

export async function decreaseItemQuantity(barcode: string, quantity: number): Promise<void> {
  try {
    const item = await getItemByBarcode(barcode);
    if (!item) {
      console.error(`Item with barcode ${barcode} not found`);
      return;
    }

    let newQuantity = item.quantity - quantity;
    if (newQuantity < 0) {
      newQuantity = 0;
    }

    const updatedItem = { ...item, quantity: newQuantity };
    const updateResponse = await updateItem(updatedItem);
    if (updateResponse.status !== 200) {
      throw new Error(`HTTP error! status: ${updateResponse.status}`);
    }
  } catch (error) {
    console.error('Error decreasing item quantity:', error);
  }
}

export async function generateBarcode(): Promise<string> {
  try {
    const response = await fetch('http://localhost:8080/items/generate-barcode/barcode');
    const data = await response.json();
    if (!!data && !!data.status && data.status === 200) {
      return data.message != null ? data.message : [];
    } else {
      return "";
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    return "";
  }
}
