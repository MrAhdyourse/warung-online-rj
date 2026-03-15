import React from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/config';
import { X, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';

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
          <div className="cart-header-title">
            <ShoppingBag size={24} color="var(--primary)" />
            <h2>Keranjang Belanja</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={80} strokeWidth={1} />
              <p>Keranjangmu masih kosong</p>
              <span>Yuk, mulai belanja sekarang!</span>
              <button className="cart-empty-btn" onClick={onClose}>
                Belanja Sekarang
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button 
                        className="qty-btn qty-btn-minus" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn qty-btn-plus" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      className="cart-item-delete"
                      onClick={() => removeFromCart(item.id)}
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
            <div className="cart-total">
              <span className="cart-total-label">Total Pesanan:</span>
              <span className="cart-total-value">{formatPrice(totalPrice)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              <MessageCircle size={20} />
              <span>Checkout via WhatsApp</span>
            </button>
            <p className="cart-footer-note">
              Pesanan akan dikirimkan melalui WhatsApp ke admin kami.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
