
import 'styles/globals.css';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'SoftwareYa'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` scroll-smooth `}>
      <body className={` bg-[#33327b] `}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
