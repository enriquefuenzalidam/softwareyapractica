'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCartContext } from '../context/CartContext';
import FondoCabecera from '/components/fondoCabecera';

const PagoResultado = () => {
  const searchParams = useSearchParams();
  const compraExito = searchParams.get('compraExito');
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  console.log('Compra Exito:', compraExito);

  const { clearCart } = useCartContext();

  useEffect(() => {
    if (compraExito === 'true') {
      clearCart();
    }
  }, [compraExito, clearCart]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main className="font-Roboto">
      <FondoCabecera portada={false} />
      <section className={` relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
        <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
          { compraExito === 'true' ? (
          <>
          <h2 style={{ lineHeight: 1.6 }} className={` mx-auto mt-8 mb-3 text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}>
            <span className={` font-medium `} >Gracias por la compra, {name}.</span><br/>
            <span className={` font-light `} >Un mensaje ha sido enviado a la dirección de correo {email}.</span>
          </h2>
          <p className={` mx-auto mt-8 mb-3 text-center `}><Link className={` hover:tracking-wider inline-block mx-auto text-lg sm:text-lg md:text-xl text-sky-600 italic font-bold font-Roboto no-underline hover:-translate-y-1 transition-all ease-in-out `} href={`/`} passHref>&#8249;&#8249; Volver al inicio</Link></p>
            </>
          ) : (
            <>
            <h2 style={{ lineHeight: 1.6 }} className={` mx-auto my-8 text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}>
              <span className={` font-medium `} >La compra no pudo ser procesada, {name}.</span><br/>
              <span className={` font-light `} >Revisa los datos ingresados y el medio de pago.</span>
            </h2>
            <p className={` mx-auto mt-8 mb-3 text-center `}><Link className={` hover:tracking-wider inline-block mx-auto text-lg sm:text-lg md:text-xl text-sky-600 italic font-bold font-Roboto no-underline hover:-translate-y-1 transition-all ease-in-out `} href={`/comprascarro`} passHref>&#8249;&#8249; Volver al inicio</Link></p>
            </>
          ) }
        </div>
      </section>
    </main>
    </Suspense>
  );

};

export default PagoResultado;
