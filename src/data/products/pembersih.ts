import { Product } from './types';

export const pembersihProducts: Product[] = [
  {
    id: 'fs-5',
    name: 'Rinso Molto Cair 750ml',
    description: 'Deterjen cair dengan aroma Molto yang menyegarkan. Menghilangkan noda membandel lebih efektif.',
    category: 'pembersih',
    price: 18000,
    originalPrice: 24000,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=400',
    stock: 20,
    unit: 'pouch',
    soldCount: 2100,
    rating: 4.8,
    isFlashSale: true,
    flashSaleProgress: 90
  },
  {
    id: 'fs-10',
    name: 'Baygon Spray 600ml',
    description: 'Pembasmi nyamuk dan serangga dengan keharuman lembut, perlindungan efektif dari demam berdarah.',
    category: 'pembersih',
    price: 38000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    stock: 12,
    unit: 'kaleng',
    soldCount: 400,
    rating: 4.9,
    isFlashSale: true,
    flashSaleProgress: 65
  },
  {
    id: 'pms-2',
    name: 'Mama Lemon Nipis 780ml',
    description: 'Cairan pencuci piring dengan ekstrak jeruk nipis yang ampuh lemak.',
    category: 'pembersih',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400',
    stock: 35,
    unit: 'pouch',
    soldCount: 3300,
    rating: 4.9
  }
];
