import ProductsListDrink from '../components/ProductsListDrink'
import { ProductsContext } from '../Helpers/Context'
import { useContext } from 'react'

const Drinks = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { drinks } = products

  return (
    <>
      <ProductsListDrink drinks={drinks} />
    </>
  )
}

export default Drinks
