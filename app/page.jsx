'use client';

import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useCartContext } from '../app/context/CartContext';


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();

  return (
    <main className={`  `}>
      <section className={` text-right text-lg p-4 `}>
        <span className={` border-solid border-black border-2 border-opacity-5 p-4 bg-white rounded-md shadow-md shadow-neutral-600 `} >{ isEmpty ? 'Vacío' : `Total: ${cartTotal} ` }</span>
      </section>
      <section>
        <ProductList />
      </section>
    </main>
  );
}
