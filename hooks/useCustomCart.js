import { useState, useEffect } from 'react';

const useCustomCart = () => {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('cartItems');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = (item) => {
    setItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((i) => {
          if (i.id === id) {
            if (i.quantity > 1) {
              return { ...i, quantity: i.quantity - 1 };
            } else {
              return null; // Mark item for removal
            }
          }
          return i;
        })
        .filter((i) => i !== null) // Remove marked items
    );
  };

  return {
    items,
    addItem,
    removeItem,
    isEmpty: items.length === 0,
    totalUniqueItems: items.length,
    cartTotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    hydrated,
  };
};

export default useCustomCart;
