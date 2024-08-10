

import { useCartContext } from '../app/context/CartContext';
import Link from 'next/link';
import softwLista from 'data/softwLista.json'; // Adjust the path based on where you placed the file

const ProductList = () => {
  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) {
    return null; // Return a loading state or nothing while the cart is being hydrated
  }

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {softwLista.map(softw => {
          // Find the item in the cart
          const cartItem = items.find(item => item.id === softw.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <li className={` flex flex-col rounded-sm p-4 bg-white bg-opacity-70 shadow-md shadow-neutral-600`} key={softw.id}>
              <h3 className={` text-black text-opacity-80 grow text-xl md:text-2xl lg:text-3xl font-Oswald font-normal mb-4`}>{softw.softNombr}</h3>
              <p className={` text-2xl font-light  font-Oswald `}>Precio: $ {new Intl.NumberFormat('es-CL').format(softw.softPrec)}</p>
              <p className={` mt-4 w-28 grid grid-cols-3 font-bold text-md rounded-sm overflow-hidden ${ quantity !== 0 ? `bg-[#faae3b] ` : `bg-white` }  bg-opacity-70 shadow-inner shadow-neutral-500 `}>
                <span className={` cursor-pointer text-center text-black  hover:bg-black hover:text-white `}  onClick={() => addItem(softw)}>+</span>
                <span className={` text-center  `}>{quantity}</span>
                <span className={` cursor-pointer text-center text-black  hover:bg-black hover:text-white`} onClick={() => removeItem(softw.id)}>-</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProductList;
