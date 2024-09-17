
import 'styles/globals.css';
import { CartProvider } from './context/CartContext';
import Footer from 'components/footer';


export const metadata = {
  title: {
      template: '%s | SoftwareYa',
      default: 'SoftwareYa'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` scroll-smooth `}>
      <head/>
      <body className={` relative bg-[#FCF5E9] min-w-full min-h-screen flex flex-col `}>
        {/* <div className={` absolute top-0 left-0 w-full h-full bg-metalicoGlassFondoB `} /> */}
        <div className={` absolute top-0 left-0 w-full h-full bg-repeat `} style={{ backgroundImage: `url(images/noise.png)` }} />
        <CartProvider>
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
