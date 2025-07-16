import { databases, Query } from '@/lib/appwrite';
import { shapeCollection } from '../collection';
import { shapeProduct } from '../fragments/product';
import type { AppCollection, AppProduct } from '../fragments/fragments';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTIONS_COLLECTION = 'collections';
const PRODUCTS_COLLECTION    = 'products';

/**
 * Fetch a single collection by handle.
 */
export async function getCollectionQuery(handle: string): Promise<AppCollection | undefined> {
  try {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS_COLLECTION,
      [ Query.equal('handle', handle) ]
    );
    const raw = res.documents[0];
    return raw ? shapeCollection(raw) : undefined;
  } catch (err: any) {
    if (err.code === 404) return undefined;
    throw err;
  }
}

/**
 * Fetch all collections.
 */
export async function getCollectionsQuery(): Promise<AppCollection[]> {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS_COLLECTION);
  return res.documents.map(shapeCollection);
}

/**
 * Fetch products for a given collection handle.
 */
export async function getCollectionProductsQuery(
  handle: string,
  sortKey?: keyof AppProduct,
  reverse: boolean = false
): Promise<AppProduct[]> {
  // First find the collection to get its ID
  const collection = await getCollectionQuery(handle);
  if (!collection) return [];

  // Then fetch products where collectionId matches
  let queries = [ Query.equal('collectionId', collection.$id) ];
  if (sortKey) {
    // Appwrite SDK doesn’t support server‐side sortKey param directly;
    // you’d generally fetch all and sort client‐side:
  }

  const res = await databases.listDocuments(
    DATABASE_ID,
    PRODUCTS_COLLECTION,
    queries
  );

  let products = res.documents.map(shapeProduct);
  if (sortKey) {
    products = products.sort((a, b) => {
      if (a[sortKey]! < b[sortKey]!) return reverse ? 1 : -1;
      if (a[sortKey]! > b[sortKey]!) return reverse ? -1 : 1;
      return 0;
    });
  }
  return products;
}
