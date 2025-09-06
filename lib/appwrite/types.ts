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
  options: ProductOption[];
  priceRange: { maxVariantPrice: Money; minVariantPrice: Money };
  variants: ProductVariant[];
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
  options: ProductOption[];
  priceRange: { maxVariantPrice: Money; minVariantPrice: Money };
  variants: ProductVariant[];
  featuredImage?: AppImage;
  images?: AppImage[];
  seo?: AppSeo;
  tags?: string[];
  updatedAt?: string;
}

/**
 * A single line item in a cart
 */
// Line item in the cart — mirrors the original Shopify `CartItem` shape
export interface CartItem {
  $id?: string;     // Unique identifier for this cart line item
  quantity: number;  // How many units of this variant are in the cart

  cost: {
    totalAmount: Money;  // The total cost for this line (quantity × unit price)
  };

  // Metadata about the product variant in the cart
  merchandise: {
    id: string;
    title: string;
    selectedOptions?: { name: string; value: string }[];  // e.g. size, color
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: AppImage;  // Same structure as Shopify's image type
    };
  };
}

/**
 * A shopping cart in your Appwrite “carts” collection
 */
export interface AppCart {
  $id: string;
  userId?: string;
  lines: CartItem[];
  totalQuantity?: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount?: Money;  // optional tax field
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface Cart {
  $id?: string;
  userId?: string;
  lines: CartItem[];
  totalQuantity?: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount?: Money;  // optional tax field
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
  amount: string;
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

