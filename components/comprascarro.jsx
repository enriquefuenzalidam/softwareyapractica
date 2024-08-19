
import { useCartContext } from '../app/context/CartContext';
import softwLista from 'data/softwLista.json';
import Link from 'next/link';
import shoppingCartIcon from 'public/images/cart-shopping.svg';

const ComprasCarro = () => {
  const { items, addItem, removeItem, isEmpty, cartTotal, hydrated } = useCartContext();

  if (!hydrated) {
    // Return a loading state or nothing while the cart is being hydrated
    return null;
  }

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cartTotal, // Total amount to be charged
          sessionId: 'some_unique_session_id', // This should be a unique session identifier
          buyOrder: `ORDER-${Date.now()}`, // A unique order ID
          returnUrl: `${window.location.origin}/api/return-url`, // Return URL after payment
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Create a form element
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = result.url;
      
        // Create a hidden input for token_ws
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token_ws';
        tokenInput.value = result.token;
      
        // Append the input to the form and submit it
        form.appendChild(tokenInput);
        document.body.appendChild(form);
        form.submit();
      } else {
        console.error('Payment initiation failed:', result.error);
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className={` flex flex-col md:flex-row `} >
      <ul className={` w-full md:w-4/6`} >
        {items.map((item) => {

          const softw = softwLista.find(product => product.id === item.id);
          const cartItem = items.find(item => item.id === softw.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          const subsQuantity = cartItem ? cartItem.subscriptionQuantity : 0;

          return (
            <li className={`relative rounded-sm p-4 bg-white bg-opacity-40 shadow-md shadow-[rgba(0,0,0,0.5)] mb-6 `} key={item.id}>
              <div className={` w-full `}>
                <h3 className={` text-black text-opacity-80 grow text-xl md:text-2xl lg:text-3xl font-Oswald font-normal `}>
                  <Link className={` no-underline hover:underline `} href={`/software?productId=${item.id}`}>{item.softNombr}</Link>
                </h3>
              </div>

              {softw.softPrec && (
                <div className={`relative `}>
                  <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-light mt-4 `}>Precio compra: </p>
                  <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-medium `}>${new Intl.NumberFormat('es-CL').format(softw.softPrec)}</p>

                  {quantity > 0 && (
                    <p className={` absolute top-full left-full -translate-x-full -translate-y-full text-md sm:text-lg md:text-xl lg:text-2xl text-center text-black font-Roboto min-w-36 md:min-w-48 grid grid-cols-3 font-bold rounded-sm ${quantity !== 0 ? `bg-[#faae3b] ` : `bg-white`} bg-opacity-70 shadow-inner shadow-neutral-500 `} style={{ userSelect: 'none' }}>
                      <span className={` px-3 md:px-6 py-1 cursor-pointer  hover:bg-black hover:text-white `} onClick={() => addItem(item, 'purchase')}>+</span>
                      <span className={` px-3 md:px-6 py-1 text-center `}>{quantity}</span>
                      <span className={` px-3 md:px-6 py-1 cursor-pointer hover:bg-black hover:text-white `} onClick={() => removeItem(item.id, 'purchase')}>-</span>
                    </p>
                  )}

                </div>
              )}
              {softw.softMensSub && (
                <div className={`relative `}>
                  <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-light mt-2 `}>Precio sucripción: </p>
                  <p className={` text-lg sm:text-xl md:text-2xl font-Oswald font-medium `}>${new Intl.NumberFormat('es-CL').format(softw.softMensSub)}</p>

                  {subsQuantity > 0 && (
                    <p className={` absolute top-full left-full -translate-x-full -translate-y-full text-md sm:text-lg md:text-xl lg:text-2xl text-center text-black font-Roboto min-w-36 md:min-w-48 grid grid-cols-3 font-bold rounded-sm ${subsQuantity !== 0 ? `bg-[#faae3b] ` : `bg-white`} bg-opacity-70 shadow-inner shadow-neutral-500 `} style={{ userSelect: 'none' }}>
                      <span className={` px-3 md:px-6 py-1 cursor-pointer  hover:bg-black hover:text-white `} onClick={() => addItem(item, 'subscription')}>+</span>
                      <span className={` px-3 md:px-6 py-1 text-center `}>{subsQuantity}</span>
                      <span className={` px-3 md:px-6 py-1 cursor-pointer hover:bg-black hover:text-white `} onClick={() => removeItem(item.id, 'subscription')}>-</span>
                    </p>
                  )}

                </div>
              )}

            </li>
          )
        })}
      </ul>
      <div className={` w-full md:w-2/6 `}>
        <p className={`block ml-0 md:ml-6 align-middle border-0 overflow-hidden relative rounded-sm py-2 px-6 bg-opacity-70 shadow-inner shadow-neutral-700 uppercase font-medium font-Oswald text-black ${isEmpty ? `text-opacity-30 bg-sky-100` : `text-opacity-80 bg-[#faae3b]`} text-xl lg:text-2xl text-center`}>
          <img className={`object-center object-contain w-12 lg:w-7 h-auto lg:inline ${isEmpty ? `opacity-30` : `opacity-60`} mx-auto lg:mr-3 my-2 lg:my-0`} src={shoppingCartIcon.src} width="28" height="auto" alt="" />
          {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)}`}
        </p>
        <p
          className={` text-center bg-sky-800 shadow-md shadow-[rgba(0,0,0,0.5)] hover:shadow-black rounded-md text-white font-semibold font-RobotoCondensed cursor-pointer text-opacity-70 hover:text-opacity-100  text-xl lg:text-2xl ml-0 md:ml-6 mt-6 px-4 py-3`}
          onClick={handlePayment}
          >Pagar aquí</p>
      </div>
    </div>
  );
};

export default ComprasCarro;
