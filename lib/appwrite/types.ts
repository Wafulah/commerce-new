export type Maybe<T> = T | null;

/**
 * Image stored in Appwrite
 */
export interface AppImage {
  $id: string;
  url: string;
  altText?: string;
}

export interface Image {
  $id: string;
  url: string;
  altText?: string;
}

/**
 * Simple SEO metadata
 */
export interface AppSeo {
  title?: string;
  description?: string;
}

/**
 * A product in your Appwrite “products” collection
 */
export interface AppProduct {
  $id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml?: string;
  options?: ProductOption[];
  priceRange?: { min: Money; max: Money };
  variants?: ProductVariant[];
  featuredImage?: AppImage;
  images?: AppImage[];
  seo?: AppSeo;
  tags?: string[];
  updatedAt?: string;
}

export interface Product {
  $id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml?: string;
  options?: ProductOption[];
  priceRange?: { min: Money; max: Money };
  variants?: ProductVariant[];
  featuredImage?: AppImage;
  images?: AppImage[];
  seo?: AppSeo;
  tags?: string[];
  updatedAt?: string;
}

/**
 * A single line item in a cart
 */
export interface CartItem {
  $id: string;
  product: AppProduct;
  quantity: number;
  cost?: Money;
}

/**
 * A shopping cart in your Appwrite “carts” collection
 */
export interface AppCart {
  $id: string;
  userId?: string;
  items: CartItem[];
  totalQuantity?: number;
  cost?: {
    subtotal: Money;
    total: Money;
    tax: Money;
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface Cart {
  $id: string;
  userId?: string;
  items: CartItem[];
  totalQuantity?: number;
  cost?: {
    subtotal: Money;
    total: Money;
    tax: Money;
  };
  createdAt?: string;
  updatedAt?: string;
}


/**
 * A category or collection in your Appwrite “collections” collection
 */
export interface AppCollection {
  $id: string;
  handle: string;
  title: string;
  description?: string;
  seo?: AppSeo;
  updatedAt?: string;
  path: string;
}

/**
 * A menu item stored in your Appwrite “menus” collection
 */
export interface Menu {
  title: string;
  path: string;
}

/**
 * A CMS page in your Appwrite “pages” collection
 */
export interface AppPage {
  $id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: AppSeo;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Basic money type
 */
export interface Money {
  amount: number;
  currencyCode: string;
}

/**
 * Product option (e.g., size, color)
 */
export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

/**
 * Product variant (e.g., SKU)
 */
export interface ProductVariant {
  $id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions?: { name: string; value: string }[];
  price: Money;
}
