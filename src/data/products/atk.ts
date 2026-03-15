import { Product } from './types';

export const atkProducts: Product[] = [
  {
    id: 'fs-4',
    name: 'Kertas HVS A4 Sinar Dunia 80gr',
    description: 'Kertas HVS kualitas terbaik untuk dokumen penting, hasil cetak tajam dan tidak mudah macet di printer.',
    category: 'atk',
    price: 49000,
    originalPrice: 60000,
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80&w=400',
    stock: 30,
    unit: 'rim',
    soldCount: 650,
    rating: 4.9,
    isFlashSale: true,
    flashSaleProgress: 40
  },
  {
    id: 'fs-9',
    name: 'Map Business File (Lusin)',
    description: 'Map plastik dengan penjepit untuk merapikan dokumen. Isi 12 pcs warna biru.',
    category: 'atk',
    price: 35000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=400',
    stock: 40,
    unit: 'lusin',
    soldCount: 150,
    rating: 4.6,
    isFlashSale: true,
    flashSaleProgress: 20
  },
  {
    id: 'atk-5',
    name: 'Pensil Faber Castell 2B',
    description: 'Pensil standar untuk ujian, grafit lembut dan tidak mudah patah.',
    category: 'atk',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400',
    stock: 200,
    unit: 'pcs',
    soldCount: 5000,
    rating: 5.0
  },
  {
    id: 'atk-13',
    name: 'Stapler Max HD-10',
    description: 'Stapler besi tahan lama, staples kertas hingga 20 lembar dengan rapi.',
    category: 'atk',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400',
    stock: 50,
    unit: 'pcs',
    soldCount: 1200,
    rating: 4.9
  }
];
