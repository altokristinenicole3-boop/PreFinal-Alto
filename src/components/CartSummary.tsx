import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-summary">
      <h2>🛒 Your Cart</h2>
      
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₱{item.price.toFixed(2)} each</p>
                </div>
                
                <div className="item-controls">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                  <span className="item-subtotal">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-totals">
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p className="total-price"><strong>Grand Total:</strong> ₱{totalPrice.toFixed(2)}</p>
            <button onClick={onCheckout} className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;