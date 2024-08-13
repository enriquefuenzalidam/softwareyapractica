"use client";
import { useCartContext } from '../app/context/CartContext';
import { useState } from 'react';
import softwLista from 'data/softwLista.json';
import categNombrs from 'data/categNombrs.json';
import imagsNombrs from 'data/imagsNombrs.json';
import Link from 'next/link';

import tempSoftImg from 'public/images/tempSoftImg.jpg';

const PodructoDespliegue = ({ productId }) => {
  const { addItem, removeItem, items, hydrated } = useCartContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Ensure the softw.softImags exists and is not empty before accessing it
  const hasImages = softw.softImags && softw.softImags.length > 0;

  // Handle next and previous image
  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % softw.softImags.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? softw.softImags.length - 1 : prevIndex - 1
      );
    }
  };

  // Get the current image URL if images are present
  const currentImageUrl = hasImages
    ? require(`public/softImagenes/${imagsNombrs.find(imgId => imgId.id === softw.softImags[currentImageIndex])?.imageName}`).default
    : null;

  return (
    <div className={` grid grid-cols-1 md:grid-cols-2 md:gap-4 `}>
      <div className={` relative min-h-96 overflow-scroll shadow-inner bg-white `}  style={!softw.softImags ? { backgroundImage: `url(${tempSoftImg.src})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `contain` } : undefined} >

{/* this block should be an images slideshow if the item has more than one image */}

{hasImages && (
  <>
    <img
      className="absolute top-0 left-0 h-full w-full object-contain object-center"
      src={currentImageUrl.src}
      alt=""
    />
  </>
)}
<div className={` absolute inset-0 shadow-inner shadow-[rgba(0,0,0,0.5)] `} />
{softw.softImags && softw.softImags.length > 1 && (
  <>
    <span
      className={`cursor-pointer absolute top-1/2 left-2 hover:left-3 -translate-y-1/2 font-Roboto font-normal text-9xl text-white`}
      style={{ textShadow: `0.3rem 0 0.4rem rgba(0,0,0,0.5)` }}
      onClick={prevImage}  // <- Add onClick handler here
    >
      &#8249;
    </span>
    <span
      className={`cursor-pointer absolute top-1/2 left-full -translate-y-1/2 -translate-x-[calc(100%+0.5rem)] hover:-translate-x-[calc(100%+0.75rem)] font-Roboto font-normal text-9xl text-white`}
      style={{ textShadow: `-0.3rem 0 0.4rem rgba(0,0,0,0.5)` }}
      onClick={nextImage}  // <- Add onClick handler here
    >
      &#8250;
    </span>
  </>
)}

{/* block's end */}

      </div>
      <div className={` mt-4 md:mt-0 flex flex-col `}>
        <h3 className="text-black text-opacity-80 text-2xl sm:text-4xl font-Oswald font-semibold ">
          {softw.softNombr}
        </h3>
        {softw.softDescr && (
          <p className={` tracking-tight hyphens-auto mt-4 font-RobotoCondensed font-light text-lg sm:text-xl md:text-2xl `}>{softw.softDescr}</p>
        )}  
        <h4 className="text-black text-opacity-80 text-xl sm:text-2xl lg:text-3xl font-Oswald font-extralight mt-6">
          Categoría{softw.softCategs.length > 1 && `s`}:</h4>
        <p className="text-lg md:text-xl lg:text-2xl grow font-Oswald text-black text-opacity-80 mt-0 md:mt-2">
          {softw.softCategs.map((categId, index) => {
            const categoryName = categNombrs.find(categ => categ.id === categId)?.catgNombr;
            const categoryId = categNombrs.find(categ => categ.id === categId)?.id;
            return (
              <><Link className={` no-underline hover:underline`} href={`/softwarecatgoria?catgoriaId=${categoryId}`} key={index}>{categoryName}</Link>{softw.softCategs.length !== 1 && (index < softw.softCategs.length - 1 && (index < softw.softCategs.length - 2 ? `, ` : ` y `))}</>);
          }
          )}.
        </p>
        <p className={` font-extralight  text-2xl md:text-3xl text-black text-opacity-80    font-Oswald mt-4 md:mt-8 `}>Precio:</p>
        <p className={` font-medium      text-2xl md:text-3xl text-black text-opacity-80 font-Oswald    mt-0 md:mt-2`}>$ {new Intl.NumberFormat('es-CL').format(softw.softPrec)}</p>
        <div>
          <p className={`  text-lg sm:text-xl md:text-2xl text-center text-black font-Roboto inline-grid grid-cols-3 font-bold rounded-sm ${quantity !== 0 ? `bg-[#faae3b] ` : `bg-white`} bg-opacity-70 shadow-inner shadow-neutral-500 mt-4 md:mt-8 `}>
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
