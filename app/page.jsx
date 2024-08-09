'use client';

import ProductList from '../components/ProductList';
import { useCartContext } from '../app/context/CartContext';


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();
  return (
    <main className={` max-w-7xl mx-auto font-Roboto`}>
      <section className={` text-right text-lg p-4 `}>
        <span className={` border-solid border-black border-2 border-opacity-5 rounded-sm p-4 bg-white shadow-sm shadow-neutral-400 `} >{ isEmpty ? `Carro de compras vacío` : `Total: ${cartTotal} ` }</span>
      </section>
      <section>
        <ProductList />
      </section>
    </main>
  );
}
