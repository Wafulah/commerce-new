// interfaces for Appwrite responses

export interface AppImage {
  $id: string;
  url: string;
  altText?: string;
}

export interface AppSeo {
  title?: string;
  description?: string;
}

export interface AppProduct {
  $id: string;
  name: string;
  slug: string;
  description: string;
  image: AppImage;
  images?: AppImage[];
  price: number;
  seo?: AppSeo;
}

//id
export interface CartItem {
  $id: string;
  product: AppProduct;
  quantity: number;
}

export interface AppCart {
  $id: string;
  userId?: string;
  lines: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AppCollection {
  $id: string;
  handle: string;
  title: string;
  description?: string;
  seo?: AppSeo;
  updatedAt?: string;
  path: string;
}
