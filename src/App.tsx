import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { PRODUCTS, Product } from './data/products';
import { CartProvider, useCart } from './context/CartContext';
import { SITE_CONFIG } from './data/config';
import { Truck, ShieldCheck, Zap, Coffee, Utensils, PenTool, ShoppingBag, Candy, Droplets, Ticket, X, Minus, Plus } from 'lucide-react';
import './styles/App.css';

// Modal Component for Quantity Selection
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

// Main App Component with Cart Provider inside
function AppContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  
  // Real-time Countdown (2 days)
  const [timeLeft, setTimeLeft] = useState<{days:number, hours:number, minutes:number, seconds:number}>({days:0, hours:0, minutes:0, seconds:0});

  useEffect(() => {
    // Set target date to 2 days from now, saved in localStorage
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
        {/* Banner Section */}
        <section className="banner-grid">
          <div className="main-banner">
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textShadow: '2px 2px 10px rgba(0,0,0,0.2)' }}>GAJIAN SALE!</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Sembako Murah, Berakhir Dalam:</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <div className="timer-box">{timeLeft.days}d</div>
                  <div style={{ color: '#333', fontWeight: 800, alignSelf: 'center' }}>:</div>
                  <div className="timer-box">{timeLeft.hours}h</div>
                  <div style={{ color: '#333', fontWeight: 800, alignSelf: 'center' }}>:</div>
                  <div className="timer-box">{timeLeft.minutes}m</div>
                  <div style={{ color: '#333', fontWeight: 800, alignSelf: 'center' }}>:</div>
                  <div className="timer-box">{timeLeft.seconds}s</div>
              </div>
            </div>
          </div>
          <div className="side-banners">
            <div className="side-banner" style={{ background: '#26aa99', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, left: -10, width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
              <span style={{ fontWeight: 800, zIndex: 1 }}>GRATIS ONGKIR RP0</span>
            </div>
            <div className="side-banner" style={{ background: '#00458e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <span style={{ fontWeight: 800 }}>CASHBACK 100%*</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: '4px', margin: '1rem 0', color: '#ee4d2d', fontSize: '0.85rem', fontWeight: 500, boxShadow: 'var(--shadow)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={16} /> 100% Original</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Truck size={16} /> Pengiriman Instan</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShoppingBag size={16} /> Stok Selalu Ready</span>
        </div>

        {/* Vouchers Section */}
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

        {/* Categories Grid */}
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

        {/* Flash Sale Section */}
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

        {/* Main Product Section */}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { name: 'BCA', color: '#0060af', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/512px-Bank_Central_Asia.svg.png' },
                  { name: 'BNI', color: '#f15a23', url: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/512px-BNI_logo.svg.png' },
                  { name: 'MANDIRI', color: '#003d79', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/512px-Bank_Mandiri_logo_2016.svg.png' },
                  { name: 'GOPAY', color: '#00aade', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/512px-Gopay_logo.svg.png' },
                  { name: 'OVO', color: '#4c2a86', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/512px-Logo_ovo_purple.svg.png' },
                  { name: 'SHOPEEPAY', color: '#ee4d2d', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/ShopeePay_logo.svg/512px-ShopeePay_logo.svg.png' }
                ].map(p => (
                  <div key={p.name} style={{ height: '35px', background: 'white', border: '1px solid #eee', borderRadius: '4px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={p.url} 
                      alt={p.name} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span style="font-size:8px; font-weight:bold; color:${p.color}">${p.name}</span>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>Ikuti Kami</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div className="social-icon" style={{ background: '#25D366', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WA" style={{ width: '18px', height: '18px' }} />
                </div>
                <div className="social-icon" style={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Instagram_button_icon.svg/512px-Instagram_button_icon.svg.png" alt="IG" style={{ width: '18px', height: '18px' }} />
                </div>
                <div className="social-icon" style={{ background: 'black', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logotipo_de_TikTok.svg/512px-Logotipo_de_TikTok.svg.png" alt="TikTok" style={{ width: '18px', height: '18px' }} />
                </div>
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
      <AppContent />
    </CartProvider>
  );
}

export default App;
