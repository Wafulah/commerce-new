import { createAdminClient } from "@/lib/appwrite/appwrite";
import { databases, Query } from 'node-appwrite';
import { shapeSeo } from '../fragments/seo';
import type { Page as AppPage } from '../fragments/fragments';

const DATABASE_ID         = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PAGES_COLLECTION    = 'pages';
// Create the Appwrite client and get the database service 
const { database } = await createAdminClient();   

/**
 * Fetch a single Page by its handle.
 *
 * @param handle — The page slug/handle
 * @returns The Page object, or undefined if not found
 */
export async function getPageQuery(handle: string): Promise<AppPage | undefined> {
  const res = await databases.listDocuments(
    DATABASE_ID,
    PAGES_COLLECTION,
    [ Query.equal('handle', handle) ]
  );
  const raw = res.documents[0];
  if (!raw) return undefined;

  return {
    $id:        raw.$id,
    title:      raw.title,
    handle:     raw.handle,
    body:       raw.body,
    bodySummary:raw.bodySummary,
    seo:        shapeSeo(raw.seo),
    createdAt:  raw.$createdAt,
    updatedAt:  raw.$updatedAt,
  };
}

/**
 * Fetch all Pages.
 *
 * @returns An array of Page objects
 */
export async function getPagesQuery(): Promise<AppPage[]> {
  const res = await databases.listDocuments(DATABASE_ID, PAGES_COLLECTION);
  return res.documents.map(raw => ({
    $id:        raw.$id,
    title:      raw.title,
    handle:     raw.handle,
    body:       raw.body,
    bodySummary:raw.bodySummary,
    seo:        shapeSeo(raw.seo),
    createdAt:  raw.$createdAt,
    updatedAt:  raw.$updatedAt,
  }));
}
