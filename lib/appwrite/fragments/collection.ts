import type { AppCollection } from './fragments';

/**
 * Converts an Appwrite document into an AppCollection
 */
export function shapeCollection(raw: any): AppCollection {
  return {
    $id: raw.$id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    seo: raw.seo,       // since seo is already { title, description }
    updatedAt: raw.$updatedAt,
    path: raw.path      // or compute `/search/${raw.handle}` here if not stored
  };
}
