import React from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { ShoppingCart, Search, Bell, HelpCircle, Globe, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeCategory, setActiveCategory, onOpenCart }) => {
  const { totalItems } = useCart();
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();

  return (
    <header>
      <div className="container">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-links">
            <span>Seller Centre</span>
            <span>Mulai Jual</span>
            <span>Download</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Ikuti kami di
              <a href={SITE_CONFIG.socialLinks?.instagram} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/50px-Instagram_icon.png" alt="Instagram" style={{ width: '16px', height: '16px' }} />
              </a>
              <a href={SITE_CONFIG.socialLinks?.tiktok} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/50px-TikTok_logo.svg.png" alt="TikTok" style={{ width: '16px', height: '16px' }} />
              </a>
              <a href={SITE_CONFIG.socialLinks?.facebook} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/50px-Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: '16px', height: '16px' }} />
              </a>
            </span>
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
            <input 
              type="text" 
              placeholder="Cari kebutuhan ATK & Sembako di sini..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={searchQuery ? 'has-value' : ''}
            />
            {searchQuery && (
              <button className="search-clear" onClick={clearSearch}>
                <X size={16} />
              </button>
            )}
            <button className="search-btn">
              <Search size={18} />
            </button>
          </div>

          <div className="cart-icon-wrapper" onClick={onOpenCart}>
            <ShoppingCart size={28} strokeWidth={2.5} />
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
