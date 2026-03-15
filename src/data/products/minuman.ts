import { Product } from './types';

export const minumanProducts: Product[] = [
  {
    id: 'fs-7',
    name: 'Aqua 600ml (KARTON)',
    description: 'Air mineral berkualitas. Satu karton isi 24 botol. Cocok untuk acara atau stok harian.',
    category: 'minuman',
    price: 45000,
    originalPrice: 52000,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400',
    stock: 20,
    unit: 'karton',
    soldCount: 800,
    rating: 4.9,
    isFlashSale: true,
    flashSaleProgress: 55
  },
  {
    id: 'min-2',
    name: 'Teh Pucuk Harum 350ml',
    description: 'Teh dalam kemasan dengan rasa teh asli yang segar. Nikmat disajikan dingin.',
    category: 'minuman',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1622484211148-716598e09141?auto=format&fit=crop&q=80&w=400',
    stock: 200,
    unit: 'botol',
    soldCount: 12400,
    rating: 4.8
  },
  {
    id: 'min-8',
    name: 'Ultra Milk Cokelat 250ml',
    description: 'Susu UHT dengan rasa cokelat yang nikmat dan kaya akan nutrisi.',
    category: 'minuman',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?auto=format&fit=crop&q=80&w=400',
    stock: 150,
    unit: 'kotak',
    soldCount: 4500,
    rating: 5.0
  },
  {
    id: 'min-10',
    name: 'Bear Brand 189ml',
    description: 'Susu steril berkualitas tinggi yang baik untuk menjaga kesehatan tubuh.',
    category: 'minuman',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?auto=format&fit=crop&q=80&w=400',
    stock: 200,
    unit: 'kaleng',
    soldCount: 8000,
    rating: 4.9
  }
];
