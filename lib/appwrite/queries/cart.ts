import { databases } from '@/lib/appwrite';
import { shapeCart } from '../cart';
import type { AppCart } from '../fragments';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CART_COLLECTION = 'carts';
//

/**
 * Retrieves and shapes a cart by its ID from Appwrite.
 * @param cartId - The ID of the cart document.
 * @returns The shaped AppCart or undefined if not found.
 */
export async function getCartQuery(cartId: string): Promise<AppCart | undefined> {
  try {
    const raw = await databases.getDocument(DATABASE_ID, CART_COLLECTION, cartId);
    return shapeCart(raw);
  } catch (error: any) {
    // If cart not found, return undefined
    if (error.code === 404) {
      return undefined;
    }
    throw error;
  }
}
