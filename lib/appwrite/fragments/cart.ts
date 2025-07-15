import type { AppCart, CartItem, AppProduct } from './fragments';

// Helper to map raw Appwrite document to frontend-friendly AppCart
export function shapeCart(raw: any): AppCart {
  const items: CartItem[] = (raw.items || []).map((rawItem: any) => ({
    $id: rawItem.$id,
    quantity: rawItem.quantity,
    product: rawItem.product as AppProduct,
  }));

  return {
    $id: raw.$id,
    userId: raw.userId,
    items,
    createdAt: raw.$createdAt,
    updatedAt: raw.$updatedAt,
  };
}
