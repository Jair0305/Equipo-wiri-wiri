import { useEffect, useState } from 'react'
import { getAdminProducts } from '../api/products'
import ProductSearch from '../components/ProductSearch'
import CreateProductAdminModal from '../components/CreateProductAdminModal'
import ProductsAdminList from '../components/ProductsAdminList'

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

  const handleDisable = async (productId, product) => {
    if (product.active === true) {
      try {
        const disableProduct = await fetch(`http://localhost:8080/product/disable/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (disableProduct) {
          // La solicitud PUT se completó con éxito, ahora se puede actualizar la lista de productos
          await fetchProducts()
        } else {
          console.error('Error al actualizar el estado del producto:', disableProduct.statusText)
        }
      } catch (error) {
        console.error('Error al realizar la solicitud PUT:', error)
      }
    } else {
      try {
        const putProduct = await fetch(`http://localhost:8080/product/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })

        if (putProduct) {
          // La solicitud PUT se completó con éxito, ahora se puede actualizar la lista de productos
          await fetchProducts()
        } else {
          console.error('Error al actualizar el estado del producto:', putProduct.statusText)
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
        <CreateProductAdminModal fetchProducts={fetchProducts} />
      </div>
      <section className='max-h-[calc(100vh-350px)] overflow-auto'>
        <ProductsAdminList products={activeProducts} handleDisable={handleDisable} fetchProducts={fetchProducts} />
      </section>

      <div className='sticky top-0 flex flex-col-reverse gap-4 items-center md:flex-row md:justify-between lg:pr-10 lg:pl-10 pb-8 bg-[#EAEAF5]'>
        <h1 className='text-3xl font-bold flex flex-col items-center md:flex-row md:items-end mt-8'>
          Productos Inactivos
          <span className='text-xl text-[#6e6e6e] pl-2'>{inactiveProducts.length} resultados</span>
        </h1>
      </div>
      <section className='max-h-[calc(100vh-350px)] overflow-auto mb-8'>
        <ProductsAdminList products={inactiveProducts} handleDisable={handleDisable} fetchProducts={fetchProducts} />
      </section>
    </div>
  )
}

export default ProductsAdmin
