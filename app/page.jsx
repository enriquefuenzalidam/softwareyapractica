'use client';

import ProductList from '../components/ProductList';
import { useCartContext } from '../app/context/CartContext';
import FondoCabecera from '../components/fondoCabecera';

import portadaVideo from 'public/images/portadaFondoVideo.mp4';
import shoppingCartIcon from 'public/images/cart-shopping.svg'


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();
  return (
    <main className={` font-Roboto`}>
      <FondoCabecera/>

      <section className={` relative p-3 sm:p-4 md:p-5 lg:p-6 bg-blue-900 `}>
        <div className={` absolute inset-0 bg-fucsiaAzulRatioFondo opacity-60 `}></div>
        <div className={` absolute inset-0 bg-repeat `} style={{ backgroundImage: `url(images/noise.png)` }}></div>
        <p className={` relative mx-auto max-w-5xl text-right pb-3 sm:pb-4 md:pb-5 lg:pb-6 `}>
          
          <span className={` overflow-hidden relative inline-block rounded-sm py-2 px-6  bg-opacity-70 shadow-inner shadow-neutral-700 uppercase font-medium font-Oswald text-black ${isEmpty ? `text-opacity-40 bg-sky-200` : `text-opacity-80 bg-[#faae3b]`} text-lg lg:text-xl `} >
            <img className={` object-center object-contain w-6 lg:w-7 h-auto inline ${isEmpty ? `opacity-30` : `opacity-60`} mr-3 `} src={shoppingCartIcon.src} width='28' height='auto' alt='' /> {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)} `}
          </span>
        </p>
        <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-cyan-200 bg-opacity-30  `}>
          <h2 className={` mx-auto mb-8  max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase font-medium  text-[#261b5b] text-opacity-100 font-Oswald `}>Encuentra el software que buscas</h2>
          <ProductList />
        </div>
      </section>
    </main>
  );
}
