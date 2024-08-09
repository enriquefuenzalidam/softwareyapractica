'use client';

import { useCartContext } from '../app/context/CartContext';

const Cart = () => {
  const { items, removeItem, isEmpty, cartTotal, hydrated } = useCartContext();

  if (!hydrated) {
    // Return a loading state or nothing while the cart is being hydrated
    return null;
  }

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${cartTotal}</h3>
    </div>
  );
};

export default Cart;
