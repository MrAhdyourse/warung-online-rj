export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'atk' | 'sembako' | 'minuman' | 'snack' | 'pembersih';
  price: number;
  originalPrice?: number;
  image: string;
  stock: number;
  unit: string;
  soldCount: number;
  rating: number;
  isFlashSale?: boolean;
  flashSaleProgress?: number;
}
