
import 'styles/globals.css';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'SoftwareYa'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` scroll-smooth `}>
      <body className={` bg-[#D4D4E1] `}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
