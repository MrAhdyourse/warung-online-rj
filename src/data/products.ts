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

export const PRODUCTS: Product[] = [
  // FLASH SALE (10 items)
  {
    id: 'fs-1',
    name: 'Beras Pandan Wangi Super 5kg',
    description: 'Beras kualitas premium, pulen, dan wangi alami tanpa pengawet. Cocok untuk konsumsi keluarga sehari-hari.',
    category: 'sembako',
    price: 68000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    stock: 25,
    unit: 'karung',
    soldCount: 1200,
    rating: 4.9,
    isFlashSale: true,
    flashSaleProgress: 85
  },
  {
    id: 'fs-2',
    name: 'Minyak Goreng SunCo 2L',
    description: 'Minyak goreng bening, tidak cepat hitam, dan mengandung vitamin E. Melalui 5x proses pemurnian.',
    category: 'sembako',
    price: 32000,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    stock: 40,
    unit: 'pouch',
    soldCount: 3500,
    rating: 4.8,
    isFlashSale: true,
    flashSaleProgress: 70
  },
  {
    id: 'fs-3',
    name: 'Telur Ayam Negeri 1kg',
    description: 'Telur ayam negeri pilihan, dikemas aman. Isi 15-16 butir per kg.',
    category: 'sembako',
    price: 24000,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1582722872445-44ad5c78a9dd?auto=format&fit=crop&q=80&w=400',
    stock: 100,
    unit: 'kg',
    soldCount: 850,
    rating: 4.7,
    isFlashSale: true,
    flashSaleProgress: 60
  },
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
    id: 'fs-6',
    name: 'Indomie Goreng (DUS)',
    description: 'Satu dus berisi 40 bungkus mie goreng favorit sepanjang masa. Praktis untuk persediaan di rumah.',
    category: 'sembako',
    price: 108000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=400',
    stock: 15,
    unit: 'dus',
    soldCount: 500,
    rating: 5.0,
    isFlashSale: true,
    flashSaleProgress: 75
  },
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
    id: 'fs-8',
    name: 'Chitato Sapi Panggang (Pack)',
    description: 'Keripik kentang bergelombang dengan bumbu sapi panggang yang kuat. Kemasan besar isi 10 bungkus.',
    category: 'snack',
    price: 85000,
    originalPrice: 100000,
    image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?auto=format&fit=crop&q=80&w=400',
    stock: 10,
    unit: 'pack',
    soldCount: 300,
    rating: 4.8,
    isFlashSale: true,
    flashSaleProgress: 30
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

  // SEMBAKO (Remaining)
  {
    id: 'smb-4',
    name: 'Gula Pasir Gulaku 1kg',
    description: 'Gula pasir kristal putih alami dari tebu pilihan. Manis dan bersih.',
    category: 'sembako',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400',
    stock: 50,
    unit: 'bungkus',
    soldCount: 2200,
    rating: 4.9
  },
  {
    id: 'smb-5',
    name: 'Garam Refina 250g',
    description: 'Garam beriodium tinggi, kristal halus, cocok untuk masakan harian.',
    category: 'sembako',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&q=80&w=400',
    stock: 100,
    unit: 'bungkus',
    soldCount: 1500,
    rating: 4.8
  },
  {
    id: 'smb-6',
    name: 'Tepung Segitiga Biru 1kg',
    description: 'Tepung terigu serbaguna protein sedang. Cocok untuk gorengan dan kue.',
    category: 'sembako',
    price: 14000,
    image: 'https://images.unsplash.com/photo-1594913785162-e67866723288?auto=format&fit=crop&q=80&w=400',
    stock: 60,
    unit: 'bungkus',
    soldCount: 1800,
    rating: 4.7
  },
  {
    id: 'smb-7',
    name: 'Mentega Blue Band 200g',
    description: 'Margarin serbaguna dengan Omega 3 & 6. Memberi rasa lezat pada masakan.',
    category: 'sembako',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
    stock: 45,
    unit: 'pcs',
    soldCount: 900,
    rating: 4.8
  },
  {
    id: 'smb-8',
    name: 'Susu Kental Manis FF',
    description: 'Susu kental manis lezat untuk tambahan minuman atau roti bakar.',
    category: 'sembako',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?auto=format&fit=crop&q=80&w=400',
    stock: 80,
    unit: 'kaleng',
    soldCount: 3000,
    rating: 4.9
  },
  {
    id: 'smb-9',
    name: 'Kecap Manis Bango 550ml',
    description: 'Dibuat dari kedelai hitam pilihan. Memberi rasa manis gurih yang pas.',
    category: 'sembako',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1622484211148-716598e09141?auto=format&fit=crop&q=80&w=400',
    stock: 30,
    unit: 'pouch',
    soldCount: 1100,
    rating: 4.9
  },
  {
    id: 'smb-10',
    name: 'Saus Sambal ABC 335ml',
    description: 'Sambal pedas mantap untuk teman makan gorengan atau bakso.',
    category: 'sembako',
    price: 15500,
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&q=80&w=400',
    stock: 40,
    unit: 'botol',
    soldCount: 850,
    rating: 4.7
  },
  {
    id: 'smb-13',
    name: 'Santan Kara 200ml',
    description: 'Santan kelapa cair instan, kental dan praktis untuk berbagai masakan.',
    category: 'sembako',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=400',
    stock: 100,
    unit: 'pcs',
    soldCount: 2500,
    rating: 4.9
  },

  // MINUMAN (Remaining)
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
  },

  // ATK (Remaining)
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
  },

  // PEMBERSIH (Remaining)
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
