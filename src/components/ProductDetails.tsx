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

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  onBack, 
  onAddToCart 
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const isLowStock = product.stock < 5;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="product-details-modal">
      <div className="details-content">
        <button className="back-btn" onClick={onBack}>← Back</button>
        
        <img src={product.image} alt={product.name} className="details-image" />
        
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="details-category">{product.category}</p>
          <p className="details-description">{product.description}</p>
          <p className="details-price">₱{product.price.toFixed(2)}</p>
          
          {isLowStock ? (
            <p className="low-stock-text">⚠️ Low Stock — Only {product.stock} left!</p>
          ) : (
            <p className="stock-text">In Stock: {product.stock} available</p>
          )}
          
          <div className="quantity-control">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="qty-btn"
            >
              −
            </button>
            <span className="qty-value">{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="qty-btn"
            >
              +
            </button>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;