import React from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/config';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp ');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const itemsList = cart.map((item, index) => 
      `${index + 1}. *${item.name}*\n   Jumlah: ${item.quantity} ${item.unit}\n   Harga: ${formatPrice(item.price * item.quantity)}`
    ).join('\n\n');

    const message = `*PESANAN BARU - ${SITE_CONFIG.name.toUpperCase()}*\n\n` +
      `Halo Admin, saya ingin memesan barang berikut:\n\n` +
      `${itemsList}\n\n` +
      `---------------------------\n` +
      `*TOTAL PEMBAYARAN: ${formatPrice(totalPrice)}*\n` +
      `---------------------------\n\n` +
      `Mohon segera diproses ya. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${SITE_CONFIG.adminWhatsApp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h2>Keranjang Belanja</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem', color: '#757575' }}>
              <ShoppingBag size={64} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>Keranjangmu masih kosong</p>
              <button 
                onClick={onClose}
                style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                Belanja Sekarang
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>{item.name}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>{formatPrice(item.price)}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <div className="qty-controls">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total" style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#757575', fontSize: '1rem', fontWeight: 400 }}>Total Pesanan:</span>
              <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>{formatPrice(totalPrice)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout Sekarang (WhatsApp)
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#757575', marginTop: '0.75rem' }}>
              Pesanan akan dikirimkan melalui WhatsApp ke admin kami.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
