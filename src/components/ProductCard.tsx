import React from 'react';
import { Product } from '../data/products/index';
import { Star, ShoppingCart, CheckCircle2, XCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp ');
  };

  const discountAmount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="product-card" onClick={product.stock > 0 ? onAddToCart : undefined} style={{ cursor: product.stock > 0 ? 'pointer' : 'default' }}>
      <div style={{ position: 'relative' }}>
        <img src={product.image} alt={product.name} className="product-image" />
        {discountAmount > 0 && (
          <div className="discount-tag">
            <span>{discountAmount}%</span>
            <small>OFF</small>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
          <h3 className="product-name">{product.name}</h3>
        </div>
        
        <div className="product-rating">
          <Star size={10} fill="#ffce3d" color="#ffce3d" style={{ display: 'inline-block' }} />
          <span style={{ marginLeft: '4px', color: '#757575', verticalAlign: 'middle' }}>
            {product.rating} | Terjual {product.soldCount > 1000 ? (product.soldCount/1000).toFixed(1) + 'rb' : product.soldCount}
          </span>
        </div>

        <div className="product-price-row">
          <div>
            {product.originalPrice && (
              <p className="original-price">{formatPrice(product.originalPrice)}</p>
            )}
            <p className="product-price">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div style={{ margin: '0.5rem 0' }}>
          {product.stock > 0 ? (
            <span style={{ color: '#26aa99', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <CheckCircle2 size={12} /> Ready Stock
            </span>
          ) : (
            <span style={{ color: '#ff4d4f', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <XCircle size={12} /> Stok Habis
            </span>
          )}
        </div>

        {product.isFlashSale && product.flashSaleProgress && (
          <div className="flash-sale-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${product.flashSaleProgress}%` }}
              ></div>
            </div>
            <span>TERJUAL {product.flashSaleProgress}%</span>
          </div>
        )}

        <button 
          className={`add-btn ${product.stock <= 0 ? 'disabled' : ''}`}
          disabled={product.stock <= 0}
          onClick={(e) => {
            e.stopPropagation();
            if (product.stock > 0) onAddToCart();
          }}
        >
          <ShoppingCart size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Beli Sekarang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
