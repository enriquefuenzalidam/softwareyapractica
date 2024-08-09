'use client';

import ProductList from '../components/ProductList';
import { useCartContext } from '../app/context/CartContext';

import portadaVideo from 'public/images/portadaFondoVideo.mp4';


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();
  return (
    <main className={` font-Roboto`}>
      <section className={` h-[38vh] relative w-full bg-cover bg-center bg-black overflow-hidden  `} id={`inicio`}>
        <div className={` absolute top-0 left-0 w-full h-full opacity-100`}>
          <video poster='images/portadaFondoVideo.png' className='object-cover object-center h-full w-full' preload="auto" autoPlay="autoplay" muted loop playsInline>
            <source src={portadaVideo} type="video/mp4" />
          </video>
        </div>
        <div className={`  absolute top-0 left-0 w-full h-full bg-fucsiaAzulRatioFondo `} />
        <div className={`  absolute top-full left-0 w-full h-3 -translate-y-3 bg-gradient-to-t from-black opacity-20 `} />
        <div className={` relative mx-auto max-w-7xl flex w-full h-full items-end justify-start `}>
          <h2 data-aos-once="true" data-aos='fade-right' className={` mx-8 -translate-y-[0.31rem] sm:-translate-y-[0.31rem] md:-translate-y-[0.39rem] lg:-translate-y-[0.47rem] font-LexendDeca text-cyan-100 text-opacity-90 text-left w-full text-5xl md:text-6xl lg:text-7xl `}><span className={`  font-thin `}>so</span><span className={`  font-extralight `} >ft</span><span className={`  font-light `} >wa</span><span className={`  font-semibold `} >re</span><span className={`  font-extrabold `} >ya</span></h2>
        </div>
        </section>
      <section className={` bg-cyan-100 bg-opacity-50 p-6 `}>
      <div className={` text-right `}>
      <span className={` inline-block rounded-sm p-2 bg-white shadow-inner shadow-neutral-400 `} >
        {isEmpty ? `Carro de compras vacío` : `Total: ${cartTotal} `}
      </span>
      </div>
      <h2 className={` mx-auto mt-8 px-8 max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase font-semibold  text-black text-opacity-40 font-RobotoCondensed `}>Encuentra el software que buscas</h2>
      <div className={`rounded-sm mx-auto p-8 max-w-7xl bg-white shadow-inner shadow-gray-500 `}>
          <ProductList />
        </div>
      </section>
    </main>
  );
}
