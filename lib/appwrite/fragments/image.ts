import type { AppImage } from './fragments';

// Maps raw Appwrite document to AppImage
export function shapeImage(raw: any): AppImage {
  return {
    $id: raw.$id,
    url: raw.url,
    altText: raw.altText,
  };
}
