import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
// components
import Header from './Header'
import Navigation from './Navigation'
import Cart from './Cart'
// helpers
import { OrdersContext, ProductsContext } from '../Helpers/Context'
import { ProductsInCartContext } from '../Helpers/Context'
// api calls
import { getProducts } from '../api/products'
// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  //refs
  const cartRef = useRef(null) // Referencia para el componente Ca
  // Global state
  const [productsInCart, setProductsInCart] = useState([])
  const [products, setProducts] = useState({ food: [], drinks: [], desserts: [] })
  const [orders, setOrders] = useState([])
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
        <OrdersContext.Provider value={{ orders, setOrders }}>
          <div className='min-h-screen h-auto lg:h-screen w-full min-w-[400px] m-auto bg-[#EAEAF5]'>
            {/* Header */}
            <Header productsInCart={productsInCart} cartRef={cartRef} />
            {/* Products */}
            <div className='flex flex-col lg:flex-row'>
              <main className='lg:w-3/5 xl:4/5 xl:ml-[5%] 2xl:ml-[10%]'>
                <Navigation />
                <Outlet />
              </main>
              {/* Cart */}
              <Cart ref={cartRef} />
              <ToastContainer className='mt-32 z-10' />
            </div>
          </div>
        </OrdersContext.Provider>
      </ProductsInCartContext.Provider>
    </ProductsContext.Provider>
  )
}

export default Layout
