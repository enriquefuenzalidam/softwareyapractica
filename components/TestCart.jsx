'use client';

import useCustomCart from '../hooks/useCustomCart';
import Link from 'next/link';

const TestCart = () => {
  const { addItem, removeItem, items, isEmpty, totalUniqueItems, cartTotal } = useCustomCart();

  return (
    <div>
      <h2>Test Cart</h2>
      <Link className={` block `} href={` `} onClick={() => addItem({ id: 1, name: 'Test Item', price: 10 })}>Add Test Item</Link>
      <Link className={` block `} href={` `} onClick={() => removeItem(1)}>Remove Test Item</Link>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${cartTotal}</h3>
    </div>
  );
};

export default TestCart;
