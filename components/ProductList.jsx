'use client';

import { useCartContext } from '../app/context/CartContext';
import Link from 'next/link';

const softwLista = [
  { id: 1, softNombr: 'Sistema Rastreo GPS Para Flota Delivery', softDisp: 'disponible', softPrec: '29990' },
  { id: 2, softNombr: 'Software Contable Pyme Mensual', softDisp: 'disponible', softPrec: '3000' },
  { id: 3, softNombr: 'Gestión de Inventarios y Almacén', softDisp: 'no disponible', softPrec: '15990' },
  { id: 4, softNombr: 'Software de Gestión de Recursos Humanos', softDisp: 'disponible', softPrec: '49990' },
  { id: 5, softNombr: 'CRM para Ventas y Marketing', softDisp: 'disponible', softPrec: '25990' },
  { id: 6, softNombr: 'Plataforma de E-commerce para Pymes', softDisp: 'no disponible', softPrec: '39990' },
  { id: 7, softNombr: 'Software de Facturación Electrónica', softDisp: 'disponible', softPrec: '19990' },
  { id: 8, softNombr: 'Sistema de Gestión de Proyectos', softDisp: 'disponible', softPrec: '29990' },
  { id: 9, softNombr: 'Herramienta de Análisis de Datos Empresariales', softDisp: 'no disponible', softPrec: '89990' },
  { id: 10, softNombr: 'Software de Control de Producción Industrial', softDisp: 'disponible', softPrec: '79990' },
  { id: 11, softNombr: 'Plataforma de Educación a Distancia', softDisp: 'disponible', softPrec: '49990' },
  { id: 12, softNombr: 'Sistema de Gestión de Calidad', softDisp: 'no disponible', softPrec: '25990' },
  { id: 13, softNombr: 'Software de Gestión de Flotas de Transporte', softDisp: 'disponible', softPrec: '45990' },
  { id: 14, softNombr: 'Sistema de Monitoreo de Redes Sociales', softDisp: 'disponible', softPrec: '34990' },
  { id: 15, softNombr: 'Software de Seguridad Informática', softDisp: 'no disponible', softPrec: '99990' },
  { id: 16, softNombr: 'Aplicación para Gestión de Reservas Hotel', softDisp: 'disponible', softPrec: '119990' },
  { id: 17, softNombr: 'Herramienta de Diseño Gráfico Profesional', softDisp: 'disponible', softPrec: '59990' },
  { id: 18, softNombr: 'Software de Gestión Documental', softDisp: 'no disponible', softPrec: '39990' },
  { id: 19, softNombr: 'Sistema de Gestión de Cadenas de Suministro', softDisp: 'disponible', softPrec: '99990' },
  { id: 20, softNombr: 'Software para Marketing Digital', softDisp: 'disponible', softPrec: '2990' },
  { id: 21, softNombr: 'Plataforma de Gestión de Tiendas Retail', softDisp: 'no disponible', softPrec: '57990' },
  { id: 22, softNombr: 'Software de Gestión de Servicios Técnicos', softDisp: 'disponible', softPrec: '26990' },
  { id: 23, softNombr: 'Aplicación de Encuestas y Feedback', softDisp: 'disponible', softPrec: '18990' },
  { id: 24, softNombr: 'Software de Gestión de Clientes (CRM)', softDisp: 'no disponible', softPrec: '49990' },
  { id: 25, softNombr: 'Sistema de Gestión de Talleres Mecánicos', softDisp: 'disponible', softPrec: '32990' },
  { id: 26, softNombr: 'Herramienta de Gestión de Redes Corporativas', softDisp: 'disponible', softPrec: '77990' },
  { id: 27, softNombr: 'Software de Planificación de Recursos Empresariales (ERP)', softDisp: 'no disponible', softPrec: '119990' },
  { id: 28, softNombr: 'Aplicación de Control de Tiempo y Asistencia', softDisp: 'disponible', softPrec: '21990' },
  { id: 29, softNombr: 'Plataforma de Gestión de Eventos', softDisp: 'no disponible', softPrec: '39990' },
  { id: 30, softNombr: 'Software de Análisis de Riesgos Financieros', softDisp: 'disponible', softPrec: '59990' },
];

const ProductList = () => {
  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) {
    return null; // Return a loading state or nothing while the cart is being hydrated
  }

  return (
    <>
      <h2 className={` text-center text-3xl font-bold`}>Softwares</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
        {softwLista.map(softw => {
          // Find the item in the cart
          const cartItem = items.find(item => item.id === softw.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <li className={` flex flex-col border-solid border-black border-2 border-opacity-5 p-4 bg-white rounded-md shadow-md shadow-neutral-600 `} key={softw.id}>
              <h3 className={` grow text-2xl font-bold mb-4`}>{softw.softNombr}</h3>
              <p >${softw.softPrec}</p>
              <p className={` mx-auto mt-4 w-28 grid grid-cols-3 font-bold text-lg rounded-md overflow-hidden `}>
                <span className={` cursor-pointer text-center text-white bg-neutral-500 hover:bg-black `}  onClick={() => addItem(softw)}>+</span>
                <span className={` text-center border-2 border-solid border-neutral-500`}>{quantity}</span>
                <span className={` cursor-pointer text-center text-white bg-neutral-500 hover:bg-black `} onClick={() => removeItem(softw.id)}>-</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProductList;
