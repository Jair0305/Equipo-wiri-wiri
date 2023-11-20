import { ProductsInCartContext } from '../Helpers/Context'
import { ProductsContext } from '../Helpers/Context'
import { useContext } from 'react'
import ProductsList from '../components/ProductsList'

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
