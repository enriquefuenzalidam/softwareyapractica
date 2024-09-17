
import React from 'react';
import { useCartContext } from '../app/context/CartContext';
import Link from 'next/link';
import softwLista from 'data/softwLista.json';
import categNombrs from 'data/categNombrs.json';

const ProductList = () => {
  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) {
    return null; // Return a loading state or nothing while the cart is being hydrated
  }

const softwaresLista = softwLista.map(softw => {
  // Find the item in the cart
  const cartItem = items.find(item => item.id === softw.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const subsQuantity = cartItem ? cartItem.subscriptionQuantity : 0;
  return (
    <li data-aos-once="true" data-aos='fade' className={`relative flex flex-col p-4 rounded-l-lg rounded-r-3xl border-t-2 border-black border-opacity-5 bg-gradient-to-b from-[rgb(217,239,252,0.5)] to-[rgb(217,239,252,0.2)] shadow-md shadow-[rgba(0,0,0,0.5)] `} key={softw.id}>
      <h3 className={` text-black text-opacity-80 text-xl md:text-2xl lg:text-3xl font-Oswald font-normal mb-4 `}><Link className={` no-underline  text-[#555] hover:text-black transition-all ease-in-out duration-300 `} href={`/software?productId=${softw.id}`} >{softw.softNombr}</Link></h3>
      <h4 className={` text-opacity-80 text-lg md:text-xl lg:text-2xl font-Oswald font-extralight  `}>Categoría{softw.softCategs.length > 1 && `s`}:</h4>
      <p className={` grow text-md md:text-lg lg:text-xl font-Oswald text-[#444] mb-4`} >
        {softw.softCategs.map((categId, index) => {
          const categoryName = categNombrs.find(categ => categ.id === categId)?.catgNombr;
          const categoryId = categNombrs.find(categ => categ.id === categId)?.id;
          return (<React.Fragment key={categId}><Link className={` no-underline hover:underline  hover:text-[#111] `} href={`/softwarecatgoria?catgoriaId=${categoryId}`} key={categoryId}>{categoryName}</Link>{softw.softCategs.length !== 1 && (index < softw.softCategs.length - 1 && (index < softw.softCategs.length - 2 ? `, ` : ` y `))}</React.Fragment>);
        })}.
      </p>
      {softw.softPrec && (
        <div className={` relative `}>
          <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-light mt-4 `}>Precio compra: </p>
          <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-medium `}>${new Intl.NumberFormat('es-CL').format(softw.softPrec)}</p>

          {quantity !== 0 && (
            <p>
              <span className={` absolute top-full left-full -translate-x-[calc(100%-1rem)] -translate-y-[calc(100%+1rem)] text-center py-1 pl-3 pr-6 inline-block font-bold text-lg md:text-xl overflow-hidden bg-[#faae3b] bg-opacity-70 shadow-inner shadow-[rgba(0,0,0,0.3)] rounded-l-lg`}>
                {quantity}
              </span>
            </p>)}

        </div>
      )}
      {softw.softMensSub && (
        <div className={` relative `}>
          <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-light mt-2 `}>Precio sucripción: </p>
          <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-medium `}>${new Intl.NumberFormat('es-CL').format(softw.softMensSub)}</p>
        
          {subsQuantity !== 0 && (
            <p>
              <span className={` absolute top-full left-full -translate-x-[calc(100%-1rem)] -translate-y-[calc(100%+1rem)] text-center py-1 pl-3 pr-6 inline-block font-bold text-lg md:text-xl overflow-hidden bg-[#faae3b] bg-opacity-70 shadow-inner shadow-[rgba(0,0,0,0.3)] rounded-l-lg `}>
                {subsQuantity}
              </span>
            </p>)}

        </div>
      )}
    </li>
  );
});


  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {softwaresLista}
      </ul>
    </>
  );
};

export default ProductList;
