
import 'styles/globals.css';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'SoftwareYa'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
