'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartContext } from '../context/CartContext';
import FondoCabecera from '/components/fondoCabecera';
import { HOME_URL, CART_URL } from '/lib/urls';

const PagoResultado = () => {
  const [compraExito, setCompraExito] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [buyOrder, setBuyOrder] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  const { clearCart } = useCartContext();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get('compraExito');
    const userName = searchParams.get('name');
    const userEmail = searchParams.get('email');
    const order = searchParams.get('buyOrder');
    const date = searchParams.get('transactionDate');

    setCompraExito(success);
    setName(userName || '');
    setEmail(userEmail || '');
    setBuyOrder(order || '');
    setTransactionDate(date || '');

    if (success === 'true') {
      clearCart();
    }
  }, []);

  if (compraExito === null) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="font-Roboto">
        <FondoCabecera portada={false} />
        <section className={` relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
            {compraExito === 'true' ? (
              <>
                <div style={{ lineHeight: 1.6 }} className={` mx-auto my-8 text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}>
                  <h2 className={` font-medium `} >Gracias, {name}. Su compra con número de orden {buyOrder} y fecha {new Date(transactionDate).toLocaleString()}, ha sido realizada con éxito.</h2>
                  <h2 className={` font-light `} >Un mensaje ha sido enviado a la dirección de correo {email}.</h2>
                </div>
                <p className={` mx-auto mt-8 mb-3 text-center `}><Link className={` hover:tracking-wider inline-block mx-auto text-lg sm:text-lg md:text-xl text-sky-600 italic font-bold font-Roboto no-underline hover:-translate-y-1 transition-all ease-in-out `} href={HOME_URL} passHref>&#8249;&#8249; Volver al inicio</Link></p>
              </>
            ) : (
              <>
                <div style={{ lineHeight: 1.6 }} className={` mx-auto my-8 text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}>
                  <h2 className={` font-medium `} >Lo sentimos, {name}, su compra no pudo ser procesada. </h2>
                  <h2 className={` font-light `} >Revisa los datos ingresados y el medio de pago.</h2>
                </div>
                <p className={` mx-auto mt-8 mb-3 text-center `}><Link className={` hover:tracking-wider inline-block mx-auto text-lg sm:text-lg md:text-xl text-sky-600 italic font-bold font-Roboto no-underline hover:-translate-y-1 transition-all ease-in-out `} href={CART_URL} passHref>&#8249;&#8249; Volver al carro</Link></p>
              </>
            )}
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default PagoResultado;