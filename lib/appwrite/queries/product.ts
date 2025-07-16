import { databases, Query } from '@/lib/appwrite';
import { shapeProduct } from '../fragments/product';
import type { AppProduct } from '../fragments/fragments';

const DATABASE_ID          = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PRODUCTS_COLLECTION  = 'products';

/**
 * Fetch a single product by its slug/handle.
 */
export async function getProductQuery(handle: string): Promise<AppProduct | undefined> {
  const res = await databases.listDocuments(
    DATABASE_ID,
    PRODUCTS_COLLECTION,
    [ Query.equal('slug', handle) ]
  );
  const raw = res.documents[0];
  return raw ? shapeProduct(raw) : undefined;
}

/**
 * Fetch multiple products, with optional text search and client‑side sorting.
 *
 * @param query   – text to search in title or description
 * @param sortKey – the field name of AppProduct to sort by
 * @param reverse – whether to reverse sort order
 */
export async function getProductsQuery(
  query?: string,
  sortKey?: keyof AppProduct,
  reverse: boolean = false
): Promise<AppProduct[]> {
  const filters = [];

  if (query) {
    // basic full‑text search on title; you can add description too
    filters.push(Query.search('title', query));
  }

  const res = await databases.listDocuments(
    DATABASE_ID,
    PRODUCTS_COLLECTION,
    filters
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

/**
 * Naïve recommendations: return up to 4 other products.
 * You can replace this with more advanced logic (e.g. same tags, categories).
 */
export async function getProductRecommendationsQuery(productId: string): Promise<AppProduct[]> {
  const all = await getProductsQuery();
  return all.filter(p => p.$id !== productId).slice(0, 4);
}
