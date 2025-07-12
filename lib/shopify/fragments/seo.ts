import type { AppSeo } from './fragments';

/**
 * Converts an Appwrite SEO-like object into an AppSeo
 */
export function shapeSeo(raw: any): AppSeo | undefined {
  if (!raw) return undefined;
  return {
    title: raw.title,
    description: raw.description,
  };
}
