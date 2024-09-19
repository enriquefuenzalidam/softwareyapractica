
import { useCartContext } from '../app/context/CartContext';
import softwLista from 'data/softwLista.json';
import ProductoFicha from './productoFicha';

const ProductList = () => {
  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) {
    return null; // Return a loading state or nothing while the cart is being hydrated
  }

  const softwaresLista = softwLista.map((softw, keyindex) => {
    // Find the item in the cart
    const cartItem = items.find(item => item.id === softw.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const subsQuantity = cartItem ? cartItem.subscriptionQuantity : 0;
    return (
      <ProductoFicha softw={softw} quantity={quantity} subsQuantity={subsQuantity} key={keyindex} />
    );
  });


  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {softwaresLista}
    </ul>
  );
};

export default ProductList;
