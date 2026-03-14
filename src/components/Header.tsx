import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, Bell, HelpCircle, Globe } from 'lucide-react';

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeCategory, setActiveCategory, onOpenCart }) => {
  const { totalItems } = useCart();

  return (
    <header>
      <div className="container">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-links">
            <span>Seller Centre</span>
            <span>Mulai Jual</span>
            <span>Download</span>
            <span>Ikuti kami di</span>
          </div>
          <div className="top-bar-links">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bell size={14} /> Notifikasi</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><HelpCircle size={14} /> Bantuan</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={14} /> Bahasa Indonesia</span>
            <span style={{ fontWeight: 700 }}>Daftar</span>
            <span style={{ fontWeight: 700 }}>Login</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="main-header">
          <div className="logo" onClick={() => window.scrollTo(0, 0)}>
            <h1>WARUNG <span>RJ</span></h1>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Cari kebutuhan ATK & Sembako di sini..." />
            <button className="search-btn">
              <Search size={18} />
            </button>
          </div>

          <div className="cart-icon-wrapper" onClick={onOpenCart}>
            <ShoppingCart size={26} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => setActiveCategory('all')}
          >
            Beranda
          </button>
          <button 
            className={activeCategory === 'atk' ? 'active' : ''} 
            onClick={() => setActiveCategory('atk')}
          >
            Alat Tulis Kantor
          </button>
          <button 
            className={activeCategory === 'sembako' ? 'active' : ''} 
            onClick={() => setActiveCategory('sembako')}
          >
            Sembako
          </button>
          <button 
            className={activeCategory === 'minuman' ? 'active' : ''} 
            onClick={() => setActiveCategory('minuman')}
          >
            Minuman
          </button>
          <button 
            className={activeCategory === 'snack' ? 'active' : ''} 
            onClick={() => setActiveCategory('snack')}
          >
            Camilan
          </button>
          <button 
            className={activeCategory === 'pembersih' ? 'active' : ''} 
            onClick={() => setActiveCategory('pembersih')}
          >
            Pembersih
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
