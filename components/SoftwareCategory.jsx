'use client';

import { useSearchParams } from 'next/navigation';
import CategoriaProductos from 'components/categoriaProductos';
import categNombrs from 'data/categNombrs.json';

const SoftwareCategory = () => {
  const searchParams = useSearchParams();
  const catgoriaId = searchParams.get('catgoriaId');

  const numericCatgoriaId = Number.isInteger(Number(catgoriaId)) ? parseInt(catgoriaId, 10) : null;
  const category = categNombrs.find(categ => categ.id === numericCatgoriaId);
  const categoryName = category ? category.catgNombr : 'Categoría desconocida';

  if (!numericCatgoriaId || !category) {
    return (
      <div className={`relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40`}>
        <h2 className={`mx-auto my-8 max-w-7xl text-center text-xl sm:text-2xl md:text-3xl uppercase text-violet-800 text-opacity-100 font-Oswald`}>
          <span className={`font-light`}>La categoría buscada no existe</span>
        </h2>
      </div>
    );
  }

  return (
    <div className={`relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40`}>
      <h2 className={`mx-auto mb-8 max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase text-opacity-100 font-Oswald`}>
        <span className={`font-extralight text-[#261b5b]`}>Softwares en categoría</span> <span className={`font-medium text-[#2184b6] `}>{categoryName}</span>
      </h2>
      <CategoriaProductos categoryId={numericCatgoriaId} />
    </div>
  );
};

export default SoftwareCategory;
