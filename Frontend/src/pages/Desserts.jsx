import ProductsList from '../components/ProductsList'
import { ProductsInCartContext } from '../Helpers/Context'
import { ProductsContext } from '../Helpers/Context'
import { useContext } from 'react'

const Desserts = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { productsInCart, setProductsInCart } = useContext(ProductsInCartContext)
  const { desserts } = products

  return (
    <>
      <ProductsList food={desserts} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
    </>
  )
}

export default Desserts
