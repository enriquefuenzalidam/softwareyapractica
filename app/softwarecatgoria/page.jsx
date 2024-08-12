'use client';

import { useSearchParams } from 'next/navigation';
import CategoriaProductos from 'components/categoriaProductos';
import { useCartContext } from '../context/CartContext';
import FondoCabecera from '/components/fondoCabecera';

import shoppingCartIcon from 'public/images/cart-shopping.svg'
import categNombrs from 'data/categNombrs.json';
import SuspenseWrapper from '/components/SuspenseWrapper';


const SoftwareCategoria = () => {

  const { cartTotal, isEmpty } = useCartContext();

  const searchParams = useSearchParams();
  const catgoriaId = searchParams.get('catgoriaId');

  const numericCatgoriaId = Number.isInteger(Number(catgoriaId)) ? parseInt(catgoriaId, 10) : null;

  const category = categNombrs.find(categ => categ.id === numericCatgoriaId);
  const categoryName = category ? category.catgNombr : 'Categoría desconocida';
{/*
  if (!numericCatgoriaId || !category) {
    return (
      <main className={` font-Roboto `}>
        <FondoCabecera portada={false} />
        <section className={` relative p-12 sm:p-16 md:p-20 lg:p-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
            <h2 className={` mx-auto my-8  max-w-7xl text-center text-xl sm:text-2xl md:text-3xl uppercase text-violet-800 text-opacity-100 font-Oswald `}><span className={`  font-light `}>La categoría buscada no existe</span></h2>
          </div>
        </section>
      </main>
    );
  }
  */}
  return (
    <SuspenseWrapper>
    <main className={` font-Roboto `}>
      <FondoCabecera portada={false} />
      <section className={` relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 pt-3 sm:pt-4 md:pt-5 lg:pt-6 px-3 sm:px-4 md:px-5 lg:px-6 `}>
        <p className={` block relative mx-auto max-w-5xl text-right mb-3 sm:mb-4 md:mb-5 lg:mb-6 `}>
          <span className={` align-middle border-0 m-0 overflow-hidden relative inline-block rounded-sm py-2 px-6  bg-opacity-70 shadow-inner shadow-neutral-700 uppercase font-medium font-Oswald text-black ${isEmpty ? `text-opacity-30 bg-sky-100` : `text-opacity-80 bg-[#faae3b]`} text-lg lg:text-xl `} >
            <img className={` object-center object-contain w-6 lg:w-7 h-auto inline ${isEmpty ? `opacity-30` : `opacity-60`} mr-3 `} src={shoppingCartIcon.src} width='28' height='auto' alt='' /> {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)} `}
          </span>
        </p>
        <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
          <h2 className={` mx-auto mb-8  max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase text-violet-800 text-opacity-100 font-Oswald `}><span className={`  font-light `}>Softwares dentro de categoría</span> <span className={` font-medium `}>{categoryName}</span></h2>
          <CategoriaProductos categoryId={numericCatgoriaId} />
        </div>

      </section>

    </main>
    </SuspenseWrapper>
  );
};

export default SoftwareCategoria;
