import { useEffect, useState } from 'react'
import { disableProductApi, getAdminProducts, enableProductApi } from '../api/products'

import ProductSearch from '../components/ProductSearch'
import CreateProductAdminModal from '../components/CreateProductAdminModal'
import ProductsAdminList from '../components/ProductsAdminList'

import { toast } from 'react-toastify'

const ProductsAdmin = () => {
  const [allProducts, setAllProducts] = useState([]) // Almacena todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]) // Almacena productos filtrados
  const [activeProducts, setActiveProducts] = useState([]) // Almacena productos activos
  const [inactiveProducts, setInactiveProducts] = useState([]) // Almacena productos inactivos

  const fetchProducts = async () => {
    const data = await getAdminProducts()
    const products = data.food.concat(data.drinks, data.desserts)
    setAllProducts(products)
    setFilteredProducts(products) // Inicialmente, muestra todos los productos
  }

  const handleSearch = (filteredProducts) => {
    setFilteredProducts(filteredProducts)
  }

  const notifyErrorDeletingProduct = (type, text) => {
    if (type === 'error') {
      toast.error(text, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.success(text, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }
  const handleProductStatus = async (productId, product) => {
    if (product.active === true) {
      try {
        const disabledProduct = await disableProductApi(productId)
        if (disabledProduct) {
          // La solicitud PUT se completó con éxito, ahora se puede actualizar la lista de productos
          await fetchProducts()
        } else {
          console.error('Error al actualizar el estado del producto:', disabledProduct.statusText)
        }
      } catch (error) {
        console.error('Error al realizar la solicitud PUT:', error)
      }
    } else {
      try {
        const enabledProduct = await enableProductApi(productId, product)
        if (enabledProduct) {
          // La solicitud PUT se completó con éxito, ahora se puede actualizar la lista de productos
          await fetchProducts()
        } else {
          console.error('Error al actualizar el estado del producto:', enabledProduct.statusText)
        }
      } catch (error) {
        console.error('Error al realizar la solicitud PUT:', error)
      }
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    setActiveProducts(filteredProducts.filter((product) => product.active === true))
    setInactiveProducts(filteredProducts.filter((product) => product.active !== true))
  }, [filteredProducts])

  return (
    <div className='flex flex-col'>
      <ProductSearch products={allProducts} onSearch={handleSearch} />
      <div className='flex flex-col-reverse gap-4 items-center md:flex-row md:justify-between lg:pr-10 lg:pl-10 pb-8 bg-[#EAEAF5]'>
        <h1 className='text-3xl font-bold flex flex-col items-center md:flex-row md:items-end'>
          Productos Activos
          <span className='text-xl text-[#6e6e6e] pl-2'>{activeProducts.length} resultados</span>
        </h1>
        <CreateProductAdminModal fetchProducts={fetchProducts} notifyErrorDeletingProduct={notifyErrorDeletingProduct} />
      </div>
      <section className='max-h-[calc(100vh-350px)] overflow-auto'>
        <ProductsAdminList
          notifyErrorDeletingProduct={notifyErrorDeletingProduct}
          products={activeProducts}
          handleDisable={handleProductStatus}
          fetchProducts={fetchProducts}
        />
      </section>

      <div className='sticky top-0 flex flex-col-reverse gap-4 items-center md:flex-row md:justify-between lg:pr-10 lg:pl-10 pb-8 bg-[#EAEAF5]'>
        <h1 className='text-3xl font-bold flex flex-col items-center md:flex-row md:items-end mt-8'>
          Productos Inactivos
          <span className='text-xl text-[#6e6e6e] pl-2'>{inactiveProducts.length} resultados</span>
        </h1>
      </div>
      <section className='max-h-[calc(100vh-350px)] overflow-auto mb-8'>
        <ProductsAdminList
          notifyErrorDeletingProduct={notifyErrorDeletingProduct}
          products={inactiveProducts}
          handleDisable={handleProductStatus}
          fetchProducts={fetchProducts}
        />
      </section>
    </div>
  )
}

export default ProductsAdmin
