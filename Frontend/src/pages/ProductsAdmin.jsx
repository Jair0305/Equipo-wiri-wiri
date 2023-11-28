import { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import ProductSearch from '../components/ProductSearch'
import foodImg from '../assets/images/food.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ProductsAdmin = () => {
  const [allProducts, setAllProducts] = useState([]) // Almacena todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]) // Almacena productos filtrados

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      const products = data.food.concat(data.drinks, data.desserts)
      setAllProducts(products)
      setFilteredProducts(products) // Inicialmente, muestra todos los productos
    }

    fetchProducts()
  }, [])

  const handleSearch = (filteredProducts) => {
    setFilteredProducts(filteredProducts)
  }

  return (
    <div className='flex flex-col'>
      <ProductSearch products={allProducts} onSearch={handleSearch} />
      <div className='flex justify-center lg:justify-end lg:pr-10 pb-8'>
        <button className='px-12 py-2 bg-[#F3C623] flex justify-center items-center gap-2 font-bold'>
          <FontAwesomeIcon icon={faPlus} className='h-[20px]' />
          Agregar
        </button>
      </div>
      <section className='h-[calc(100vh-400px)] overflow-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-8 px-8 overflow-y-auto w-full'>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className='p-4 items-center justify-center shadow-xl rounded-lg bg-[#F7F6FF] lg:grid lg:grid-cols-4 gap-4 mb-8'>
                <img src={foodImg} alt={product.name} className='h-auto object-cover mb-4 lg:col-span-1' />
                <div className='lg:col-span-2'>
                  <h2 className='text-lg lg:text-xl font-bold'>{product.name}</h2>
                  <p className='text-sm lg:text-base'>{product.description}</p>
                </div>
                <div className='lg:col-span-1 flex lg:flex-col justify-center items-center gap-4'>
                  <p className='text-sm lg:text-base font-bold'>$ {product.price}</p>
                  <p className='text-sm lg:text-base font-bold'>$ {product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full flex items-center justify-center p-4'>
              <h1 className='font-bold text-2xl text-center'>No se encontraron coincidencias.</h1>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductsAdmin
