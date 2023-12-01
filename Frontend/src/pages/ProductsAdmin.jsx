import { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import ProductSearch from '../components/ProductSearch'
import foodImg from '../assets/images/food.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import CreateProductAdminModal from '../components/CreateProductAdminModal'
import EditProductAdminModal from '../components/EditProductAdminModa'

const ProductsAdmin = () => {
  const [allProducts, setAllProducts] = useState([]) // Almacena todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]) // Almacena productos filtrados

  const fetchProducts = async () => {
    const data = await getProducts()
    const products = data.food.concat(data.drinks, data.desserts)
    setAllProducts(products)
    setFilteredProducts(products) // Inicialmente, muestra todos los productos
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (filteredProducts) => {
    setFilteredProducts(filteredProducts)
  }

  return (
    <div className='flex flex-col'>
      <ProductSearch products={allProducts} onSearch={handleSearch} />
      <div className='flex justify-center lg:justify-end lg:pr-10 pb-8 bg-[#EAEAF5]'>
        <CreateProductAdminModal fetchProducts={fetchProducts} />
      </div>
      <section className='h-[calc(100vh-400px)] overflow-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-8 px-8 overflow-y-auto w-full'>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-7 md:gap-2 p-4 justify-center items-center shadow-xl rounded-lg bg-[#F7F6FF] mb-8'>
                <img
                  src={foodImg}
                  alt={product.name}
                  className=' md:col-span-3 xl:col-span-2 h-auto object-cover mb-4 lg:pr-1 lg:mb-0 rounded-lg'
                />
                <div className='md:col-span-4 xl:col-span-4 flex flex-col justify-center items-start'>
                  <h2 className='text-xl lg:text-xl font-bold'>{product.name}</h2>
                  <p className='text-base lg:text-sm text-justify mb-4 md:pr-2'>{product.description}</p>
                </div>
                <section className='md:col-span-1 flex md:flex-col justify-evenly items-center gap-4 h-[100px] lg:h-full md:pr-4 md:pl-6 border-t-[1px] md:border-l-[1px] md:border-t-0 border-[#e0e0e0]'>
                  <div className='text-sm lg:text-base font-bold'>
                    <EditProductAdminModal fetchProducts={fetchProducts} product={product} />
                  </div>
                  <div className='text-sm lg:text-base font-bold'>
                    <button>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className='transition-colors h-[30px] lg:h-[25px] text-red-700 hover:text-red-600'
                      />
                    </button>
                  </div>
                </section>
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
