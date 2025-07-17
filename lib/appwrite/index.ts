// app/api/index.ts
"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Cart mutations & query
import {
  createCartMutation,
  addToCartMutation,
  editCartMutation,
  removeFromCartMutation
} from "@/lib/appwrite/mutations/cart";

import {
  getCartQuery as fetchCartQuery,
} from "@/lib/appwrite/queries/cart";

// Collection queries
import {
  getCollectionQuery as fetchCollection,
  getCollectionsQuery as fetchCollections,
  getCollectionProductsQuery as fetchCollectionProducts,
} from "@/lib/appwrite/queries/collection";

// Menu query
import { getMenuQuery as fetchMenu } from "@/lib/appwrite/queries/menu";

// Page queries
import {
  getPageQuery as fetchPage,
  getPagesQuery as fetchPages,
} from "@/lib/appwrite/queries/page";

// Product queries
import {
  getProductQuery as fetchProduct,
  getProductsQuery as fetchProducts,
  getProductRecommendationsQuery as fetchProductRecommendations,
} from "@/lib/appwrite/queries/product";

// TYPES (optional, for clarity)
import type {
  AppCart as Cart,
  AppCollection as Collection,
  Menu,
  AppPage as Page,
  AppProduct as Product,
} from "@/lib/appwrite/fragments";

// ——————————————————————————————————————————————
// Cart
// — create a new cart (optionally tied to a logged‑in user)
export async function createCart(): Promise<Cart> {
  const userId = cookies().get("userId")?.value;
  return createCartMutation(userId);
}

// — add lines to cart
export async function addToCart(
  productId: string,
  quantity: number
): Promise<Cart> {
  const cartId = cookies().get("cartId")?.value!;
  return addToCartMutation(cartId, productId, quantity);
}

// — edit existing cart items
export async function updateCart(
  updates: { itemId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = cookies().get("cartId")?.value!;
  return editCartMutation(cartId, updates);
}

// — remove lines from cart
export async function removeFromCart(itemIds: string[]): Promise<Cart> {
  const cartId = cookies().get("cartId")?.value!;
  return removeFromCartMutation(cartId, itemIds);
}

// — fetch the current cart (or undefined if none)
export async function getCart(): Promise<Cart | undefined> {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return undefined;
  return fetchCartQuery(cartId);
}

// ——————————————————————————————————————————————
// Collections
// — single collection by handle
export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  return fetchCollection(handle);
}

// — all collections
export async function getCollections(): Promise<Collection[]> {
  return fetchCollections();
}

// — products in a given collection
export async function getCollectionProducts({
  collection,
  sortKey,
  reverse,
}: {
  collection: string;
  sortKey?: keyof Product;
  reverse?: boolean;
}): Promise<Product[]> {
  return fetchCollectionProducts(collection, sortKey, reverse);
}

// ——————————————————————————————————————————————
// Menu
export async function getMenu(handle: string): Promise<Menu[]> {
  return fetchMenu(handle);
}

// ——————————————————————————————————————————————
// Pages
export async function getPage(handle: string): Promise<Page | undefined> {
  return fetchPage(handle);
}

export async function getPages(): Promise<Page[]> {
  return fetchPages();
}

// ——————————————————————————————————————————————
// Products
export async function getProduct(
  handle: string
): Promise<Product | undefined> {
  return fetchProduct(handle);
}

export async function getProducts({
  query,
  sortKey,
  reverse,
}: {
  query?: string;
  sortKey?: keyof Product;
  reverse?: boolean;
} = {}): Promise<Product[]> {
  return fetchProducts(query, sortKey, reverse);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  return fetchProductRecommendations(productId);
}

// ——————————————————————————————————————————————
// (Optional) Revalidate endpoint for webhooks can be
// reimplemented using Next.js ISR or your own logic.
// If you still need webhook-driven ISR, you could:
//
// export async function revalidate(req: NextRequest): Promise<NextResponse> {
//   // implement your Appwrite‑triggered revalidation here
//   return NextResponse.json({ status: 200 });
// }
