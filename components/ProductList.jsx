

import { useCartContext } from '../app/context/CartContext';
import Link from 'next/link';
import softwLista from 'data/softwLista.json';
import categNombrs from 'data/categNombrs.json';

const ProductList = () => {
  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) {
    return null; // Return a loading state or nothing while the cart is being hydrated
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {softwLista.map(softw => {
          // Find the item in the cart
          const cartItem = items.find(item => item.id === softw.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return (
            <li className={`relative flex flex-col rounded-sm p-4 bg-white bg-opacity-40 shadow-md shadow-[rgba(0,0,0,0.5)] `} key={softw.id}>
              <h3 className={` text-black text-opacity-80 grow text-xl md:text-2xl lg:text-3xl font-Oswald font-normal mb-4 `}><Link className={` no-underline hover:underline `} href={`/software?productId=${softw.id}`} >{softw.softNombr}</Link></h3>
              <h4 className={` text-black text-opacity-80 text-lg md:text-xl lg:text-2xl font-Oswald font-extralight  `}>Categoría{softw.softCategs.length > 1 && `s`}:</h4>
              <p className={` text-md md:text-lg lg:text-xl font-Oswald text-black text-opacity-80 mb-4`} >
                {softw.softCategs.map((categId, index) => {
                  const categoryName = categNombrs.find(categ => categ.id === categId)?.catgNombr;
                  const categoryId = categNombrs.find(categ => categ.id === categId)?.id;
                  return (
                    <><Link className={` no-underline hover:underline`} href={`/softwarecatgoria?catgoriaId=${categoryId}`} key={index}>{categoryName}</Link>{softw.softCategs.length !== 1 && (index < softw.softCategs.length - 1 && (index < softw.softCategs.length - 2 ? `, ` : ` y `))}</>);
                }
                )}.
              </p>
              <p className={` text-lg sm:text-xl md:text-2xl font-Oswald `}><span className={` font-light `}>Precio: </span><span className={` font-medium `}>${new Intl.NumberFormat('es-CL').format(softw.softPrec)}</span></p>
              {quantity !== 0 && (
                <p>
                  <span className={` absolute top-full left-full -translate-x-[calc(100%+1rem)] -translate-y-[calc(100%+1rem)] text-center py-1 px-3 inline-block font-bold text-lg md:text-xl rounded-sm overflow-hidden bg-[#faae3b] bg-opacity-70 shadow-inner shadow-neutral-500 `}>
                    {quantity}
                  </span></p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProductList;
