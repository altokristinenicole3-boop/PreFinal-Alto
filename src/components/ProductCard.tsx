import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const isLowStock = product.stock < 5;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">₱{product.price.toFixed(2)}</p>
        
        {isLowStock ? (
          <span className="low-stock">⚠️ Low Stock: {product.stock} left</span>
        ) : (
          <span className="in-stock">In Stock: {product.stock}</span>
        )}
        
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
