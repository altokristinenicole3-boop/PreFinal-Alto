import React from 'react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, cartCount }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">🍔 Our Crazy Burger</h1>
      <div className="nav-buttons">
        <button 
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => setCurrentPage('home')}
        >
          Products
        </button>
        <button 
          className={currentPage === 'add' ? 'active' : ''}
          onClick={() => setCurrentPage('add')}
        >
          Add Product
        </button>
        <button 
          className={currentPage === 'cart' ? 'active' : ''}
          onClick={() => setCurrentPage('cart')}
        >
          🛒 Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
