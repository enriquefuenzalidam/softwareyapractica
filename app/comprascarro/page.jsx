'use client';

import { useCartContext } from '../context/CartContext';
import FondoCabecera from '/components/fondoCabecera';
import ComprasCarro from '/components/comprascarro';

const SoftwarePage = () => {
  const { cartTotal, isEmpty } = useCartContext();

  return (
    <main className="font-Roboto">
      <FondoCabecera portada={false} />
      <section className={` relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
            {isEmpty ? (
              <h2 className={` mx-auto my-8 text-center text-xl sm:text-2xl md:text-3xl uppercase font-medium  text-[#261b5b] text-opacity-100 font-Oswald `}>Tu carro de compras está vacío</h2>
            ) : (
              <>
              <h2 className={` mx-auto mb-8 text-left text-xl sm:text-2xl md:text-3xl uppercase font-medium  text-[#261b5b] text-opacity-100 font-Oswald `}>Tu carro de compras</h2>
              <ComprasCarro />
              </>
              )}
            
          </div>
      </section>
    </main>
  );
};

export default SoftwarePage;
