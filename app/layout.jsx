
import 'styles/globals.css';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'SoftwareYa'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` scroll-smooth `}>
      <body className={` relative bg-[#D4D4E1] min-w-full min-h-svh `}>
        <div className={` absolute top-0 left-0 w-full h-full bg-metalicoGlassFondoB `}></div>
        <div className={` absolute top-0 left-0 w-full h-full bg-repeat `} style={{ backgroundImage: `url(images/noise.png)` }}></div>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
