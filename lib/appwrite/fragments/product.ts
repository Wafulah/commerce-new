import type { AppProduct, AppImage, AppSeo } from './fragments';
import { shapeImage } from './image';

/**
 * Maps a raw Appwrite product document to AppProduct
 */
export function shapeProduct(raw: any): AppProduct {
  const image = raw.image ? shapeImage(raw.image) : undefined;

  const images: AppImage[] = Array.isArray(raw.images)
    ? raw.images.map((img: any) => shapeImage(img))
    : [];

  const seo: AppSeo | undefined = raw.seo
    ? {
        title: raw.seo.title,
        description: raw.seo.description,
      }
    : undefined;

  return {
    $id: raw.$id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    image: image!,
    images,
    price: raw.price,
    seo,
  };
}
