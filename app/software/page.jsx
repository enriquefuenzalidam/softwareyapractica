'use client';

import { useSearchParams } from 'next/navigation';
import { useCartContext } from '../context/CartContext';

import FondoCabecera from '/components/FondoCabecera';
import SoftwareDespliegue from '/components/SoftwareDespliegue';
import softwLista from '/data/softwLista.json';

import shoppingCartIcon from 'public/images/cart-shopping.svg';

const ProductPage = () => {
  const { cartTotal, isEmpty } = useCartContext();

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId'); // Get productId from search parameters

  // Check if the productId is a valid integer string
  const numericProductId = Number.isInteger(Number(productId)) ? parseInt(productId, 10) : null;

  const softWareId = softwLista.find(soft => soft.id === numericProductId);

  if (!numericProductId || !softWareId) {
    return (
      <main className={` font-Roboto `}>
        <FondoCabecera portada={false} />
        <section className={` relative p-12 sm:p-16 md:p-20 lg:p-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
            <h2 className={` mx-auto my-8  max-w-7xl text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}><span className={`  font-light `}>El producto buscado no existe</span></h2>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="font-Roboto">
      <FondoCabecera portada={false} />
      <section className="relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 pt-3 sm:pt-4 md:pt-5 lg:pt-6 px-3 sm:px-4 md:px-5 lg:px-6">
        <p className="block relative mx-auto max-w-5xl text-right mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <span className={`align-middle border-0 m-0 overflow-hidden relative inline-block rounded-sm py-2 px-6 bg-opacity-70 shadow-inner shadow-neutral-700 uppercase font-medium font-Oswald text-black ${isEmpty ? `text-opacity-30 bg-sky-100` : `text-opacity-80 bg-[#faae3b]`} text-lg lg:text-xl`}>
            <img className={`object-center object-contain w-6 lg:w-7 h-auto inline ${isEmpty ? `opacity-30` : `opacity-60`} mr-3`} src={shoppingCartIcon.src} width="28" height="auto" alt="" />
            {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)}`}
          </span>
        </p>
        <div className="relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40">
          <div className={` flex flex-col rounded-sm p-4 bg-white bg-opacity-40 shadow-md shadow-[rgba(0,0,0,0.5)] `}>
            <SoftwareDespliegue productId={numericProductId} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
