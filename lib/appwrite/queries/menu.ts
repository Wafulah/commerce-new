import { createAdminClient } from "@/lib/appwrite/appwrite";
import { Query } from 'node-appwrite';
import type { Menu } from '../fragments/fragments';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const MENUS_COLLECTION = 'menus';
// Create the Appwrite client and get the database service 
const { databases } = await createAdminClient();  

/**
 * Fetch the menu document by its handle and return its items.
 *
 * @param handle – The unique handle/key for the menu.
 * @returns An array of Menu items (title + path).
 */
export async function getMenuQuery(handle: string): Promise<Menu[]> {
  // Find the menu doc where handle matches
  const res = await databases.listDocuments(
    DATABASE_ID,
    MENUS_COLLECTION,
    [ Query.equal('handle', handle) ]
  );

  const menuDoc = res.documents[0];
  if (!menuDoc || !Array.isArray(menuDoc.items)) {
    return [];
  }

  // Assuming items is stored as [{ title: string; path: string }]
  return menuDoc.items as Menu[];
}
