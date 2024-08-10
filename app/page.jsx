'use client';

import ProductList from '../components/ProductList';
import { useCartContext } from '../app/context/CartContext';

import portadaVideo from 'public/images/portadaFondoVideo.mp4';
import shoppingCartIcon from 'public/images/cart-shopping.svg'


export default function Home() {
  const { cartTotal, isEmpty } = useCartContext();
  return (
    <main className={` font-Roboto`}>
      <section className={` h-[24vh] sm:h-[38vh] lg:h-[50vh] relative w-full bg-cover bg-center bg-black overflow-hidden  `} id={`inicio`}>
        <div className={` absolute top-0 left-0 w-full h-full opacity-60`}>
          <video  className='object-cover object-center h-full w-full' preload="auto" autoPlay="autoplay" muted loop playsInline>
            <source src={portadaVideo} type="video/mp4" />
          </video>
        </div>
        <div className={`  absolute top-0 left-0 w-full h-full bg-cabeceraVideoFondo `} />
        <div className={`  absolute top-full left-0 w-full h-3 -translate-y-3 bg-gradient-to-t from-black opacity-20 `} />
        <div className={` relative mx-auto max-w-6xl flex w-full h-full items-end justify-start `}>
          <h2 data-aos-once="true" data-aos='fade-right' className={` mx-8 -translate-y-[0.31rem] sm:-translate-y-[0.31rem] md:-translate-y-[0.39rem] lg:-translate-y-[0.47rem] font-LexendDeca text-opacity-100 text-left w-full text-6xl md:text-7xl lg:text-8xl `} style={{ textShadow: `0 0 0.1rem #000, 0 0 0.6rem #000` }}><span className={`  font-thin text-[#B99CD0]`}>so</span><span className={`  font-extralight text-[#9F8CCC] `} >ft</span><span className={`  font-light text-[#867AC8] `} >wa</span><span className={`  font-semibold text-[#746FC6] `} >re</span><span className={`  font-extrabold  text-[#6364C3] `} >ya</span></h2>
        </div>
      </section>
      
      <section className={` relative p-3 sm:p-4 md:p-5 lg:p-6 bg-blue-900 `}>
        <div className={` absolute inset-0 bg-fucsiaAzulRatioFondo opacity-60 `}></div>
        <div className={` absolute inset-0 bg-repeat `} style={{ backgroundImage: `url(images/noise.png)`, backgroundSize: `15%` }}></div>
        <p className={` relative mx-auto max-w-5xl text-right pb-3 sm:pb-4 md:pb-5 lg:pb-6 `}>
          
          <span className={` overflow-hidden relative inline-block rounded-sm py-2 px-6  ${isEmpty ? `bg-sky-200` : `bg-[#faae3b]`} bg-opacity-70 shadow-inner shadow-neutral-700 uppercase font-medium font-Oswald text-black text-opacity-80 text-lg lg:text-xl `} >
            <img className={` object-center object-contain w-6 lg:w-7 h-auto inline opacity-50 mr-3 `} src={shoppingCartIcon.src} width='28' height='auto' alt='' /> {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)} `}
          </span>
        </p>
        <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-30  ck `}>
          <h2 className={` mx-auto mb-8  max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase font-medium  text-[#261b5b] text-opacity-100 font-Oswald `}>Encuentra el software que buscas</h2>
          <ProductList />
        </div>
      </section>
    </main>
  );
}
