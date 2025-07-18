import { createAdminClient } from "@/lib/appwrite/appwrite";
import { ID } from 'node-appwrite';
import type { AppCart, CartItem, AppProduct } from './fragments';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CART_COLLECTION = 'carts';

// Create the Appwrite client and get the database service
const { database } = await createAdminClient();

function shapeCart(raw: any): AppCart {
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

/**
 * Creates a new cart.
 */
export async function createCartMutation(userId?: string): Promise<AppCart> {
  const raw = await databases.createDocument(
    DATABASE_ID,
    CART_COLLECTION,
    ID.unique(),
    { userId, items: [] }
  );
  return shapeCart(raw);
}

/**
 * Adds quantity to existing or new CartItem.
 */
export async function addToCartMutation(
  cartId: string,
  product: AppProduct,
  quantity: number
): Promise<AppCart> {
  const rawCart = await databases.getDocument(DATABASE_ID, CART_COLLECTION, cartId);
  let items: CartItem[] = (rawCart.items || []).map((rawItem: any) => ({
    $id: rawItem.$id,
    quantity: rawItem.quantity,
    product: rawItem.product as AppProduct,
  }));

  const idx = items.findIndex(item => item.product.$id === product.$id);
  if (idx >= 0) {
    items[idx].quantity += quantity;
  } else {
    items.push({ $id: `item_${Date.now()}`, product, quantity });
  }

  const updated = await databases.updateDocument(
    DATABASE_ID,
    CART_COLLECTION,
    cartId,
    { items }
  );
  return shapeCart(updated);
}

/**
 * Updates quantities for a list of CartItems.
 */
export async function editCartMutation(
  cartId: string,
  updates: { itemId: string; quantity: number }[]
): Promise<AppCart> {
  const rawCart = await databases.getDocument(DATABASE_ID, CART_COLLECTION, cartId);
  let items: CartItem[] = (rawCart.items || []).map((rawItem: any) => ({
    $id: rawItem.$id,
    quantity: rawItem.quantity,
    product: rawItem.product as AppProduct,
  }));

  items = items.map(item => {
    const u = updates.find(u => u.itemId === item.$id);
    return u ? { ...item, quantity: u.quantity } : item;
  });

  const updated = await databases.updateDocument(
    DATABASE_ID,
    CART_COLLECTION,
    cartId,
    { items }
  );
  return shapeCart(updated);
}

/**
 * Removes one or more CartItems.
 */
export async function removeFromCartMutation(
  cartId: string,
  itemIds: string[]
): Promise<AppCart> {
  const rawCart = await databases.getDocument(DATABASE_ID, CART_COLLECTION, cartId);
  let items: CartItem[] = (rawCart.items || []).map((rawItem: any) => ({
    $id: rawItem.$id,
    quantity: rawItem.quantity,
    product: rawItem.product as AppProduct,
  }));

  items = items.filter(item => !itemIds.includes(item.$id));

  const updated = await databases.updateDocument(
    DATABASE_ID,
    CART_COLLECTION,
    cartId,
    { items }
  );
  return shapeCart(updated);
}
