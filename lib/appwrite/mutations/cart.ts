import { createAdminClient } from "@/lib/appwrite/appwrite";
import { ID } from 'node-appwrite';
import type { AppCart, CartItem, AppProduct } from './fragments';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CART_COLLECTION = 'carts';

// Create the Appwrite client and get the database service
const { databases } = await createAdminClient();

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
  itemsToAdd: { merchandiseId: string; quantity: number }[]
): Promise<AppCart> {
  const rawCart = await databases.getDocument(DATABASE_ID, CART_COLLECTION, cartId);
  let items: CartItem[] = (rawCart.items || []).map((raw: any) => ({
    $id: raw.$id,
    quantity: raw.quantity,
    product: raw.product as AppProduct,
  }));

  for (const { merchandiseId, quantity } of itemsToAdd) {
    const idx = items.findIndex(item => item.product.$id === merchandiseId);
    if (idx >= 0) {
      items[idx].quantity += quantity;
    } else {
      items.push({
        $id: `item_${merchandiseId}_${Date.now()}`,
        product,
        quantity,
      });
    }
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
  updates: { id: string; merchandiseId: string; quantity: number }[]
): Promise<AppCart> {
  // Fetch the raw cart document
  const rawCart = await databases.getDocument(
    DATABASE_ID,
    CART_COLLECTION,
    cartId
  );

  // Shape existing items array
  let items: CartItem[] = (rawCart.items || []).map((raw: any) => ({
    $id: raw.$id,
    quantity: raw.quantity,
    product: raw.product as AppProduct,
  }));

  // Apply each update by matching on line id
  items = items.map(item => {
    const u = updates.find(update => update.id === item.$id);

    if (u) {
      // (Optional) Verify merchandiseId matches:
      if (u.merchandiseId !== item.product.$id) {
        console.warn(
          `Update for line ${u.id} passed merchandiseId ${u.merchandiseId}, but existing product is ${item.product.$id}`
        );
      }
      return { ...item, quantity: u.quantity };
    }

    return item;
  });

  // Persist the updated cart back to Appwrite
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
