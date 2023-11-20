import ProductsList from '../components/ProductsList'
import { ProductsContext } from '../Helpers/Context'
import { ProductsInCartContext } from '../Helpers/Context'
import { useContext } from 'react'

const Food = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { productsInCart, setProductsInCart } = useContext(ProductsInCartContext)
  const { food } = products

  return (
    <>
      <ProductsList food={food} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
    </>
  )
}

export default Food
