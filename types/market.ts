export type ProductStatus =
  | 'IN_STOCK'
  | 'OUT_OF_STOCK'
  | 'COIN_ONLY'
  | 'SOON';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  id: string;
  hex: string;
  name: string;
}

export interface MarketProduct {
  id: string;
  title: string;
  description: string;
  priceSum: number;
  priceCoin: number;
  status: ProductStatus;
  count: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
}
