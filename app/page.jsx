'use client';

import ProductList from '../components/ProductList';
import { useCartContext } from '../app/context/CartContext';

import portadaVideo from 'public/images/portadaFondoVideo.mp4';


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();
  return (
    <main className={` font-Roboto`}>
      <section className={` h-[38vh] relative w-full bg-cover bg-center bg-black overflow-hidden  `} id={`inicio`}>
        <div className={` absolute top-0 left-0 w-full h-full opacity-60`}>
          <video poster='images/portadaFondoVideo.png' className='object-cover object-center h-full w-full' preload="auto" autoPlay="autoplay" muted loop playsInline>
            <source src={portadaVideo} type="video/mp4" />
          </video>
        </div>
        <div className={` relative mx-auto max-w-7xl flex w-full h-full items-end justify-start p-4`}>
          <h2 data-aos-once="true" data-aos='fade-right' className={`translate-y-[0.62rem] font-LexendDeca text-white text-opacity-100 max-w-5xl text-left w-full transition-all ease-in-out text-5xl md:text-6xl lg:text-7xl lg:my-0 `}><span className={`  font-thin `}>so</span><span className={`  font-extralight `} >ft</span><span className={`  font-light `} >wa</span><span className={`  font-semibold `} >re</span><span className={`  font-extrabold `} >ya</span></h2>
        </div>
      </section>
      <section className={` text-right text-lg p-4 `}>
        <span className={` border-solid border-black border-2 border-opacity-5 rounded-sm p-4 bg-white shadow-sm shadow-neutral-400 `} >{isEmpty ? `Carro de compras vacío` : `Total: ${cartTotal} `}</span>
      </section>
      <section className={` max-w-7xl mx-auto `}>
        <ProductList />
      </section>
    </main>
  );
}
