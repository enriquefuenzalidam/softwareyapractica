import { useCartContext } from '../app/context/CartContext';
import softwLista from 'data/softwLista.json';
import categNombrs from 'data/categNombrs.json';
import Link from 'next/link';

import tempSoftImg from 'public/images/tempSoftImg.jpg'

const PodructoDespliegue = ({ productId }) => {
  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) {
    return null; // Return a loading state or nothing while the cart is being hydrated
  }

  // Find the specific product by ID
  const softw = softwLista.find(product => product.id === productId);

  // If the product is not found, you can return a message or null
  if (!softw) {
    return <p>Producto no encontrado</p>;
  }

  // Find the item in the cart
  const cartItem = items.find(item => item.id === softw.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className={` grid grid-cols-1 md:grid-cols-2 md:gap-4 `}>
      <div className={` relative min-h-96 overflow-hidden shadow-inner bg-white  `} >
        <img className={` absolute h-full w-full object-contain object-center `} src={tempSoftImg.src} alt='' />
        <div className={` absolute inset-0 shadow-inner shadow-[rgba(0,0,0,0.5)] `}></div>
      </div>
      <div className={` mt-4 md:mt-0 flex flex-col `}>
        <h3 className="text-black text-opacity-80 text-2xl sm:text-4xl font-Oswald font-semibold mb-4">
          {softw.softNombr}
        </h3>
        <h4 className="text-black text-opacity-80 text-xl sm:text-2xl lg:text-3xl font-Oswald font-extralight mt-4">
          Categoría{softw.softCategs.length>1&&`s`}:</h4>
        <p className="text-lg md:text-xl lg:text-2xl grow font-Oswald text-black text-opacity-80 mt-2">
          {softw.softCategs.map((categId, index) => {
            const categoryName = categNombrs.find(categ => categ.id === categId)?.catgNombr;
            const categoryId = categNombrs.find(categ => categ.id === categId)?.id;
            return (
              <><Link className={` no-underline hover:underline`} href={`/softwarecatgoria?catgoriaId=${categoryId}`} key={index}>{categoryName}</Link>{ softw.softCategs.length !== 1 && (index < softw.softCategs.length-1 && (  index < softw.softCategs.length-2 ? `, `: ` y `))}</>);}
            )}.
        </p>
        <p className={` text-2xl font-light font-Oswald mt-8 `}>
          Precio: $ {new Intl.NumberFormat('es-CL').format(softw.softPrec)}
        </p>
        <div>
        <p className={`  text-lg sm:text-xl md:text-2xl text-center text-black font-Roboto mt-4 inline-grid grid-cols-3 font-bold rounded-sm ${quantity !== 0 ? `bg-[#faae3b] ` : `bg-white`} bg-opacity-70 shadow-inner shadow-neutral-500 `}>
          <span className={` px-6 py-1 cursor-pointer  hover:bg-black hover:text-white `} onClick={() => addItem(softw)}>+</span>
          <span className={` px-6 py-1 text-center `}>{quantity}</span>
          <span className={` px-6 py-1 cursor-pointer hover:bg-black hover:text-white `} onClick={() => removeItem(softw.id)}>-</span>
        </p>
        </div>
      </div>
    </div>
  );
};

export default PodructoDespliegue;
