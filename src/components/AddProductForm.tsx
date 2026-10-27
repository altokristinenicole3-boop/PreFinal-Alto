import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

interface AddProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !image || !price || !category || !description || !stock) {
      setError('⚠️ Please fill in ALL fields!');
      return;
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    if (priceNum <= 0 || stockNum <= 0) {
      setError('⚠️ Price and Stock must be positive numbers!');
      return;
    }

    onAddProduct({
      name,
      image,
      price: priceNum,
      category,
      description,
      stock: stockNum
    });

    setName('');
    setImage('');
    setPrice('');
    setCategory('');
    setDescription('');
    setStock('');
    setError('');
  };

  return (
    <div className="add-product-section">
      <h2>➕ Add New Product</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste image link here"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Burgers, Drinks, Desserts"
          />
        </div>

        <div className="form-group">
          <label>Price (₱):</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
          />
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
