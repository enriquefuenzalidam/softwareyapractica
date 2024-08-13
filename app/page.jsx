'use client';

import ProductList from '../components/ProductList';
import { useCartContext } from '../app/context/CartContext';
import FondoCabecera from '../components/fondoCabecera';
import Link from 'next/link';

import shoppingCartIcon from 'public/images/cart-shopping.svg'


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();
  return (
    <>
      <main className={` relative font-Roboto `}>
        <FondoCabecera portada={true} />

        <section className={` relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 pt-3 sm:pt-4 md:pt-5 lg:pt-6 px-3 sm:px-4 md:px-5 lg:px-6 `}>

          <Link href='/comprascarro' className={` block relative mx-auto max-w-5xl text-right mb-3 sm:mb-4 md:mb-5 lg:mb-6 `}>
            <span className={` align-middle border-0 m-0 overflow-hidden relative inline-block rounded-sm py-2 px-6  bg-opacity-70 hover:bg-opacity-80 shadow-inner shadow-neutral-700 uppercase font-medium font-Oswald text-black ${isEmpty ? `text-opacity-30 bg-sky-100` : `text-opacity-80 bg-[#faae3b] hover:bg-[#fa813b] `} text-lg lg:text-xl `} >
              <img className={` object-center object-contain w-6 lg:w-7 h-auto inline ${isEmpty ? `opacity-30` : `opacity-60`} mr-3 `} src={shoppingCartIcon.src} width='28' height='auto' alt='' /> {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)} `}
            </span>
          </Link>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
            <h2 className={` mx-auto mb-8  max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase font-medium  text-[#261b5b] text-opacity-100 font-Oswald `}>Encuentra el software que buscas</h2>
            <ProductList />
          </div>
        </section>
      </main>
    </>
  );
}
