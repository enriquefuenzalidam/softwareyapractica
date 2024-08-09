'use client';

import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useCartContext } from '../app/context/CartContext';


export default function Home() {
  const { cartTotal } = useCartContext();

  return (
    <main>
      <section>
      Total: ${cartTotal}
      </section>
      <section>
        <ProductList />
      </section>
    </main>
  );
}
