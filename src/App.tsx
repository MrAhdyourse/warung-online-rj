import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { PRODUCTS, Product } from './data/products/index';
import { CartProvider, useCart } from './context/CartContext';
import { SearchProvider, useSearch } from './context/SearchContext';
import { SITE_CONFIG } from './data/config';
import { Truck, ShieldCheck, Zap, Coffee, Utensils, PenTool, ShoppingBag, Candy, Droplets, Ticket, X, Minus, Plus, Search } from 'lucide-react';
import './styles/App.css';

const QuantityModal = ({ product, isOpen, onClose, onAdd }: { product: Product | null, isOpen: boolean, onClose: () => void, onAdd: (qty: number) => void }) => {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp ');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="modal-body">
          <img src={product.image} alt={product.name} className="modal-img" />
          <div className="modal-info">
            <h3>{product.name}</h3>
            <p className="modal-desc">{product.description}</p>
            <p className="modal-price">{formatPrice(product.price)} / {product.unit}</p>

            <div className="modal-qty-selector">
              <span>Jumlah:</span>
              <div className="qty-controls">
                <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
                <input type="number" value={qty} readOnly />
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))}><Plus size={14} /></button>
              </div>
            </div>

            <button className="modal-add-btn" onClick={() => { onAdd(qty); onClose(); }}>
              Masukkan ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { searchQuery, searchResults, isSearching, clearSearch } = useSearch();

  const [timeLeft, setTimeLeft] = useState<{days:number, hours:number, minutes:number, seconds:number}>({days:0, hours:0, minutes:0, seconds:0});

  useEffect(() => {
    let targetStr = localStorage.getItem('sale_target_date');
    let targetDate: number;

    if (!targetStr) {
      targetDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);
      localStorage.setItem('sale_target_date', targetDate.toString());
    } else {
      targetDate = parseInt(targetStr);
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Determine which products to show based on search or category
  const getDisplayProducts = () => {
    // If there's a search query, show search results
    if (searchQuery.trim()) {
      return searchResults;
    }
    // Otherwise, show category-filtered products
    return activeCategory === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory);
  };

  const displayProducts = getDisplayProducts();
  const isSearchMode = searchQuery.trim().length > 0;

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const flashSaleProducts = PRODUCTS.filter(p => p.isFlashSale).slice(0, 10);

  const handleAddWithQty = (product: Product) => {
    setSelectedProduct(product);
  };

  const finalizeAddToCart = (qty: number) => {
    if (selectedProduct) {
      for(let i=0; i<qty; i++) {
        addToCart(selectedProduct);
      }
    }
  };

  return (
    <div className="app">
      <Header 
        activeCategory={activeCategory} 
        setActiveCategory={(cat) => setActiveCategory(cat)} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="container">
        <section className="banner-grid">
          <div className="main-banner">
            <div className="banner-content">
              <h2 className="banner-title">GAJIAN SALE!</h2>
              <p className="banner-subtitle">Sembako Murah, Berakhir Dalam:</p>
              <div className="timer-row">
                  <div className="timer-box">{timeLeft.days}d</div>
                  <div className="timer-sep">:</div>
                  <div className="timer-box">{timeLeft.hours}h</div>
                  <div className="timer-sep">:</div>
                  <div className="timer-box">{timeLeft.minutes}m</div>
                  <div className="timer-sep">:</div>
                  <div className="timer-box">{timeLeft.seconds}s</div>
              </div>
            </div>
          </div>
          <div className="side-banners">
            <div className="side-banner side-banner-green">
              <span>GRATIS ONGKIR RP0</span>
            </div>
            <div className="side-banner side-banner-blue">
              <span>CASHBACK 100%*</span>
            </div>
          </div>
        </section>

        <div className="trust-badges">
          <span><ShieldCheck size={16} /> 100% Original</span>
          <span><Truck size={16} /> Pengiriman Instan</span>
          <span><ShoppingBag size={16} /> Stok Selalu Ready</span>
        </div>

        <section>
          <div className="section-header" style={{ background: 'transparent', padding: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Ticket size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>VOUCHER UNTUKMU</h3>
            </div>
          </div>
          <div className="voucher-container">
            <div className="voucher-card">
              <div className="voucher-info">
                <h5>POTONGAN 10RB</h5>
                <p>Min. Belanja 50rb</p>
              </div>
              <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 700 }}>KLAIM</button>
            </div>
            <div className="voucher-card">
              <div className="voucher-info">
                <h5>GRATIS ONGKIR</h5>
                <p>Min. Belanja 0rb</p>
              </div>
              <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 700 }}>KLAIM</button>
            </div>
            <div className="voucher-card">
              <div className="voucher-info">
                <h5>DISKON 50%</h5>
                <p>Khusus Pengguna Baru</p>
              </div>
              <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 700 }}>KLAIM</button>
            </div>
          </div>
        </section>

        <section>
          <div className="section-header">
            <h3 style={{ textTransform: 'uppercase', color: '#757575', fontWeight: 500 }}>Kategori Pilihan</h3>
          </div>
          <div className="category-grid">
            <div className={`category-item ${activeCategory === 'all' ? 'active-cat' : ''}`} onClick={() => setActiveCategory('all')}>
              <ShoppingBag size={32} color="#ee4d2d" />
              <span>Semua</span>
            </div>
            <div className={`category-item ${activeCategory === 'sembako' ? 'active-cat' : ''}`} onClick={() => setActiveCategory('sembako')}>
              <Utensils size={32} color="#ee4d2d" />
              <span>Sembako</span>
            </div>
            <div className={`category-item ${activeCategory === 'atk' ? 'active-cat' : ''}`} onClick={() => setActiveCategory('atk')}>
              <PenTool size={32} color="#ee4d2d" />
              <span>ATK</span>
            </div>
            <div className={`category-item ${activeCategory === 'minuman' ? 'active-cat' : ''}`} onClick={() => setActiveCategory('minuman')}>
              <Coffee size={32} color="#ee4d2d" />
              <span>Minuman</span>
            </div>
            <div className={`category-item ${activeCategory === 'snack' ? 'active-cat' : ''}`} onClick={() => setActiveCategory('snack')}>
              <Candy size={32} color="#ee4d2d" />
              <span>Camilan</span>
            </div>
            <div className={`category-item ${activeCategory === 'pembersih' ? 'active-cat' : ''}`} onClick={() => setActiveCategory('pembersih')}>
              <Droplets size={32} color="#ee4d2d" />
              <span>Pembersih</span>
            </div>
          </div>
        </section>

        <section>
          <div className="section-header" style={{ borderBottom: 'none', background: 'transparent', padding: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={24} fill="#ee4d2d" color="#ee4d2d" />
              <h3 style={{ color: '#ee4d2d', fontSize: '1.25rem', fontWeight: 900 }}>FLASH SALE</h3>
            </div>
          </div>
          <div className="product-grid">
            {flashSaleProducts.map(product => (
              <ProductCard 
                key={`flash-${product.id}`} 
                product={product} 
                onAddToCart={() => handleAddWithQty(product)}
              />
            ))}
          </div>
        </section>

        {/* Search Results Section - shown when searching */}
        {isSearchMode && (
          <section>
            <div className="section-header" style={{ background: '#fff3e0', borderRadius: '4px 4px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search size={20} color="#ee4d2d" />
                  <h3 style={{ color: '#ee4d2d', fontSize: '1.1rem', fontWeight: 700 }}>
                    Hasil Pencarian: "{searchQuery}"
                  </h3>
                  {!isSearching && (
                    <span style={{ color: '#757575', fontSize: '0.9rem', fontWeight: 400 }}>
                      ({displayProducts.length} produk ditemukan)
                    </span>
                  )}
                </div>
                <button 
                  onClick={clearSearch}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid #ee4d2d', 
                    color: '#ee4d2d',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Reset Pencarian
                </button>
              </div>
            </div>
            
            {isSearching ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '0 0 4px 4px' }}>
                <div className="loading-spinner"></div>
                <p style={{ color: '#757575', marginTop: '1rem' }}>Mencari produk...</p>
              </div>
            ) : displayProducts.length > 0 ? (
              <div className="product-grid">
                {displayProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddWithQty(product)}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '0 0 4px 4px' }}>
                <Search size={48} color="#ccc" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Produk tidak ditemukan</h4>
                <p style={{ color: '#757575', fontSize: '0.9rem' }}>
                  Tidak ada produk yang cocok dengan "{searchQuery}"
                </p>
                <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Coba kata kunci lain atau telusuri kategori
                </p>
              </div>
            )}
          </section>
        )}

        {/* Normal Recommendations Section - shown when NOT searching */}
        {!isSearchMode && (
          <section>
            <div className="section-header">
              <h3 style={{ textTransform: 'uppercase', color: '#ee4d2d', borderBottom: '4px solid #ee4d2d', paddingBottom: '0.5rem' }}>
                Rekomendasi Untukmu
              </h3>
            </div>
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddWithQty(product)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>Layanan Pelanggan</h4>
              <ul>
                <li>Pusat Bantuan</li>
                <li>Cara Pembelian</li>
                <li>Pengiriman</li>
                <li>Hubungi Kami</li>
              </ul>
            </div>
            <div>
              <h4>Tentang {SITE_CONFIG.name}</h4>
              <ul>
                <li>Tentang Kami</li>
                <li>Kebijakan Privasi</li>
                <li>Syarat & Ketentuan</li>
                <li>Flash Sale</li>
              </ul>
            </div>
            <div>
              <h4>Pembayaran Aman</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[
                  { name: 'BCA', url: '/assets/payment/bca.svg' },
                  { name: 'BNI', url: '/assets/payment/bni.svg' },
                  { name: 'Mandiri', url: '/assets/payment/mandiri.svg' },
                  { name: 'GoPay', url: '/assets/payment/gopay.svg' },
                  { name: 'OVO', url: '/assets/payment/ovo.svg' },
                  { name: 'ShopeePay', url: '/assets/payment/shopeepay.svg' },
                  { name: 'DANA', url: '/assets/payment/dana.svg' },
                  { name: 'LinkAja', url: '/assets/payment/linkaja.svg' }
                ].map(p => (
                  <div key={p.name} style={{ height: '38px', background: 'white', border: '1px solid #eee', borderRadius: '4px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={p.url} 
                      alt={p.name} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>Ikuti Kami</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a 
                  href={SITE_CONFIG.socialLinks?.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="WhatsApp"
                >
                  <img src="/assets/social/whatsapp.svg" alt="WhatsApp" style={{ width: '36px', height: '36px' }} />
                </a>
                <a 
                  href={SITE_CONFIG.socialLinks?.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="Instagram"
                >
                  <img src="/assets/social/instagram.svg" alt="Instagram" style={{ width: '36px', height: '36px' }} />
                </a>
                <a 
                  href={SITE_CONFIG.socialLinks?.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="TikTok"
                >
                  <img src="/assets/social/tiktok.svg" alt="TikTok" style={{ width: '36px', height: '36px' }} />
                </a>
                <a 
                  href={SITE_CONFIG.socialLinks?.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="Facebook"
                >
                  <img src="/assets/social/facebook.svg" alt="Facebook" style={{ width: '36px', height: '36px' }} />
                </a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#757575' }}>
            <p>&copy; 2026 {SITE_CONFIG.name}. Seluruh hak cipta dilindungi undang-undang.</p>
            <p>Dibuat dengan ❤️ untuk kemudahan belanja Anda.</p>
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <QuantityModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAdd={finalizeAddToCart}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </CartProvider>
  );
}

export default App;