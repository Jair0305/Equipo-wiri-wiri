import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Navigation from './Navigation'
import { ProductsContext } from '../Helpers/Context'
import { ProductsInCartContext } from '../Helpers/Context'
import { getProducts } from '../api/products'
import Cart from './Cart'

const Layout = () => {
  // Global state
  const [productsInCart, setProductsInCart] = useState([])

  const [products, setProducts] = useState({ food: [], drinks: [], desserts: [] })
  // Call api for data and fill global state
  useEffect(() => {
    const fetchProducts = async () => {
      const productsFetched = await getProducts()
      setProducts(productsFetched)
    }
    fetchProducts().catch(console.error)
  }, [])

  return (
    // Pass global state to children
    <ProductsContext.Provider value={{ products, setProducts }}>
      <ProductsInCartContext.Provider value={{ productsInCart, setProductsInCart }}>
        <div className='h-screen w-full min-w-[420px] m-auto bg-[#EAEAF5]'>
          {/* Header */}
          <Header />
          {/* Products */}
          <div className='flex flex-col lg:flex-row'>
            <main className='lg:w-3/5 xl:4/5 xl:ml-[5%] 2xl:ml-[10%]'>
              <Navigation />
              <Outlet />
            </main>

            {/* Cart */}
            <Cart />
          </div>
        </div>
      </ProductsInCartContext.Provider>
    </ProductsContext.Provider>
  )
}

export default Layout
