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

  const addItem = (item, type = 'purchase') => {
    setItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: type === 'purchase' ? i.quantity + 1 : i.quantity,
                subscriptionQuantity:
                  type === 'subscription'
                    ? (i.subscriptionQuantity || 0) + 1
                    : i.subscriptionQuantity || 0,
              }
            : i
        );
      }
      return [
        ...prevItems,
        {
          ...item,
          quantity: type === 'purchase' ? 1 : 0,
          subscriptionQuantity: type === 'subscription' ? 1 : 0,
        },
      ];
    });
  };

  const removeItem = (id, type = 'purchase') => {
    setItems((prevItems) =>
      prevItems
        .map((i) => {
          if (i.id === id) {
            if (type === 'purchase' && i.quantity > 0) {
              return { ...i, quantity: i.quantity - 1 };
            } else if (
              type === 'subscription' &&
              (i.subscriptionQuantity || 0) > 0
            ) {
              return {
                ...i,
                subscriptionQuantity: i.subscriptionQuantity - 1,
              };
            }
          }
          return i;
        })
        .filter((i) => i.quantity > 0 || (i.subscriptionQuantity || 0) > 0) // Filter out items with both quantities at zero
    );
  };
  

  return {
    items,
    addItem,
    removeItem,
    isEmpty: items.length === 0,
    totalUniqueItems: items.length,
    cartTotal: items.reduce((total, item) => {
      const purchaseTotal = item.softPrec ? item.softPrec * item.quantity : 0;
      const subscriptionTotal = item.softMensSub ? item.softMensSub * (item.subscriptionQuantity || 0) : 0;
      return total + purchaseTotal + subscriptionTotal;
    }, 0),
    hydrated,
  };
};

export default useCustomCart;
