import { ProductsInCartContext } from '../Helpers/Context'
import { ProductsContext } from '../Helpers/Context'
import { useContext } from 'react'
import ProductsList from '../components/ProductsList'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

const Drinks = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { productsInCart, setProductsInCart } = useContext(ProductsInCartContext)
  const { drinks } = products

  return (
    <>
      <ProductsList food={drinks} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
    </>
  )
}

export default Drinks
