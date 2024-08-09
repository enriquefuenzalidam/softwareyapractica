'use client';

import { useCartContext } from '../app/context/CartContext';

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  // Add more products as needed
];

const ProductList = () => {
  const { addItem, hydrated } = useCartContext();

  if (!hydrated) {
    // Return a loading state or nothing while the cart is being hydrated
    return null;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
