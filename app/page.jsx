'use client';

import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useCartContext } from '../app/context/CartContext';


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();

  return (
    <main className={` max-w-6xl mx-auto `}>
      <section className={` text-right text-lg p-4 `}>
        <span className={` border-solid border-black border-2 border-opacity-5 rounded-sm p-4 bg-white shadow-md shadow-neutral-400 `} >{ isEmpty ? 'Vacío' : `Total: ${cartTotal} ` }</span>
      </section>
      <section>
        <ProductList />
      </section>
    </main>
  );
}
