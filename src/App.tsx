import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import AddProductForm from './components/AddProductForm';
import CartSummary from './components/CartSummary';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Classic Beef Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    price: 99,
    category: 'Burgers',
    description: 'Juicy beef patty with fresh lettuce, tomato, and sesame seed bun',
    stock: 15
  },
  {
    id: 2,
    name: 'Cheese Burger Deluxe',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
    price: 129,
    category: 'Burgers',
    description: 'Double cheese, caramelized onions, and special sauce',
    stock: 3
  },
  {
    id: 3,
    name: 'Crispy Chicken Burger',
    image: 'https://thescranline.com/wp-content/uploads/2022/02/crispy-chicken-burger-WEB-01.jpg',
    price: 119,
    category: 'Burgers',
    description: 'Crispy fried chicken fillet with creamy mayo and fresh veggies',
    stock: 8
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = filterCategory === 'All'
    ? products
    : products.filter(p => p.category === filterCategory);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now()
    };
    setProducts(prev => [...prev, product]);
    setCurrentPage('home');
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setSelectedProduct(null);
    setCurrentPage('cart');
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setShowCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setShowCheckoutSuccess(false);
      setCurrentPage('home');
    }, 2000);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartItems}
      />

      <main className="main-content">
        {currentPage === 'home' && (
          <div>
            <h2 className="section-title">OUR CRAZY BURGER</h2>
            
            <div className="filter-bar">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={filterCategory === cat ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'add' && (
          <AddProductForm onAddProduct={handleAddProduct} />
        )}

        {currentPage === 'cart' && (
          <>
            {showCheckoutSuccess && (
              <div className="checkout-success">
                ✅ Order Placed Successfully! Thank you! 🎉
              </div>
            )}
            <CartSummary
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
              onCheckout={handleCheckout}
            />
          </>
        )}

        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
    </div>
  );
};

export default App;