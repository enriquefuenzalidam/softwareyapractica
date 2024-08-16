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
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!hydrated) {
    return null;
  }

  const softw = softwLista.find(product => product.id === productId);

  const cartItem = items.find(item => item.id === softw.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const subsQuantity = cartItem ? cartItem.subscriptionQuantity : 0;

  const hasImages = softw.softImags && softw.softImags.length > 0;

  const nextImage = () => {
    if (hasImages) { setCurrentImageIndex((prevIndex) => (prevIndex + 1) % softw.softImags.length); }
  };

  const prevImage = () => {
    if (hasImages) { setCurrentImageIndex((prevIndex) => prevIndex === 0 ? softw.softImags.length - 1 : prevIndex - 1); }
  };

  const currentImageUrl = hasImages ? require(`public/softImagenes/${imagsNombrs.find(imgId => imgId.id === softw.softImags[currentImageIndex])?.imageName}`).default : null;

  const handleShowMoreClick = () => {
    setShowFullDescription(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseOverlay = () => {
    setShowFullDescription(false);
    document.body.style.overflow = 'scroll';
  };

  return (
    <div className={` grid grid-cols-1 md:grid-cols-2 md:gap-4 `}>

      <div>
        <div className={` relative min-h-96 overflow-scroll shadow-inner bg-white `} style={!softw.softImags ? { backgroundImage: `url(${tempSoftImg.src})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `contain` } : undefined} >

          {hasImages && (
            <>
              <img className=" transition-all ease-in-out absolute top-0 left-0 h-full w-full object-contain object-center"
                src={currentImageUrl.src} alt="" />
            </>
          )}
          <div className={` absolute inset-0 shadow-inner shadow-[rgba(0,0,0,0.5)] `} />
          {softw.softImags && softw.softImags.length > 1 && (
            <>
              <span className={` transition-all ease-in-out cursor-pointer absolute top-1/2 left-2 hover:left-3 -translate-y-1/2 font-Roboto font-normal text-9xl text-white`}
                style={{ textShadow: `0.3rem 0 0.6rem rgba(0,0,0,0.8)` }} onClick={prevImage}>&#8249;</span>
              <span className={` transition-all ease-in-out cursor-pointer absolute top-1/2 left-full -translate-y-1/2 -translate-x-[calc(100%+0.5rem)] hover:-translate-x-[calc(100%+0.75rem)] font-Roboto font-normal text-9xl text-white`}
                style={{ textShadow: `-0.3rem 0 0.6rem rgba(0,0,0,0.8)` }} onClick={nextImage}>&#8250;</span>
            </>
          )}

        </div></div>
      <div className={` mt-4 md:mt-0 flex flex-col `}>
        <h3 className="text-black text-opacity-80 text-2xl sm:text-4xl font-Oswald font-semibold ">
          {softw.softNombr}
        </h3>

        <p className={` mt-4 `}>
        {
          softw.softDescr && (
            <span
              className={`tracking-tight hyphens-auto font-light font-RobotoCondensed text-lg sm:text-xl md:text-xl `}
              dangerouslySetInnerHTML={{
                __html: (softw.softDescr.length > 100 ? softw.softDescr.slice(0, 150) + '... ' : softw.softDescr),
              }}
            />
          )
        }
        {
          softw.softDescr.length > 100 && (
            <span
              className="inline whitespace-nowrap cursor-pointer text-sky-700 italic font-bold font-RobotoCondensed text-lg sm:text-xl md:text-xl hover:translate-x-3 transition-transform ease-in-out"
              onClick={handleShowMoreClick} >
              Leer más &#8250;&#8250;</span>
          )
        }
        </p>


        {/* this is the block overlay that should appear as the user click the 'Leer más >>' */}
        {softw.softDescr && showFullDescription && (
          <div className={` z-50 fixed top-0 left-0 w-screen h-screen p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center `}>

            <div className={` relative flex max-w-[56rem] max-h-[calc(100vh-8rem)] rounded-md shadow-md shadow-[rgba(0,0,0,0.5)] bg-slate-200 `}>
              <div className={`relative p-3 flex flex-col gap-3`}>
                <div
                  className={` p-6 grow overflow-scroll tracking-tight hyphens-auto font-RobotoCondensed font-light text-lg sm:text-xl md:text-xl   ]`}
                  dangerouslySetInnerHTML={{
                    __html: `<h3 class="text-black text-opacity-80 text-2xl sm:text-4xl font-Oswald font-semibold mb-4">` + (softw.softNombr) + `</h3><p class=" my-2">` + (softw.softDescr).replace(/\n/g, `</p><p class=" my-2">`) + `</p>`,
                  }} />
                <p className={` text-center `}><span className=" z-50 bg-sky-800 shadow-md shadow-[rgba(0,0,0,0.5)] hover:shadow-black px-4 py-1 rounded-sm text-white font-semibold font-RobotoCondensed text-lg md:text-xl cursor-pointer text-opacity-70 hover:text-opacity-100 " onClick={handleCloseOverlay}>Cerrar</span></p>
              </div>
            </div>
          </div>
        )}

        {showFullDescription && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
            />

          </>
        )}

        {/* block's end */}

        <h4 className="text-black text-opacity-80 text-xl sm:text-2xl lg:text-3xl font-Oswald font-extralight mt-6">
          Categoría{softw.softCategs.length > 1 && `s`}:</h4>
        <p className="text-lg md:text-xl lg:text-2xl grow font-Oswald text-black text-opacity-80 mt-0 md:mt-2">
          {softw.softCategs.map((categId, index) => {
            const categoryName = categNombrs.find(categ => categ.id === categId)?.catgNombr;
            const categoryId = categNombrs.find(categ => categ.id === categId)?.id;
            return (<><Link className={` no-underline hover:underline`} href={`/softwarecatgoria?catgoriaId=${categoryId}`} key={index}>{categoryName}</Link>{softw.softCategs.length !== 1 && (index < softw.softCategs.length - 1 && (index < softw.softCategs.length - 2 ? `, ` : ` y `))}</>);
          })}.
        </p>

        {softw.softPrec && (
          <div>

            <p className={` text-2xl md:text-3xl mt-6 md:mt-10 `}>
              <span className={` font-extralight  text-black text-opacity-80 font-Oswald `}>Precio compra: </span>
              <span className={` font-medium      text-black text-opacity-80 font-Oswald `}>${new Intl.NumberFormat('es-CL').format(softw.softPrec)}</span>
            </p>
            <div>
              <p className={`  text-lg sm:text-xl md:text-2xl text-center text-black font-Roboto inline-grid grid-cols-3 font-bold rounded-sm ${quantity !== 0 ? `bg-[#faae3b] ` : `bg-white`} bg-opacity-70 shadow-inner shadow-neutral-500 mt-2 md:mt-4 `}>
                <span className={` px-6 py-1 cursor-pointer  hover:bg-black hover:text-white `} onClick={() => addItem(softw, 'purchase')}>+</span>
                <span className={` px-6 py-1 text-center `}>{quantity}</span>
                <span className={` px-6 py-1 cursor-pointer hover:bg-black hover:text-white `} onClick={() => removeItem(softw.id, 'purchase')}>-</span>
              </p>
            </div>

          </div>
        )}

        {softw.softMensSub && (
          <div>

            <p className={` text-2xl md:text-3xl mt-6 md:mt-10 `}>
              <span className={` font-extralight text-black text-opacity-80 font-Oswald `}>Precio sucripción: </span>
              <span className={` font-medium     text-black text-opacity-80 font-Oswald `}>${new Intl.NumberFormat('es-CL').format(softw.softMensSub)}</span>
            </p>
            <div>
              <p className={`  text-lg sm:text-xl md:text-2xl text-center text-black font-Roboto inline-grid grid-cols-3 font-bold rounded-sm ${subsQuantity !== 0 ? `bg-[#faae3b] ` : `bg-white`} bg-opacity-70 shadow-inner shadow-neutral-500 mt-2 md:mt-4 `}>
                <span className={` px-6 py-1 cursor-pointer  hover:bg-black hover:text-white `} onClick={() => addItem(softw, 'subscription')}>+</span>
                <span className={` px-6 py-1 text-center `}>{subsQuantity}</span>
                <span className={` px-6 py-1 cursor-pointer hover:bg-black hover:text-white `} onClick={() => removeItem(softw.id, 'subscription')}>-</span>
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PodructoDespliegue;