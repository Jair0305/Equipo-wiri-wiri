import ProductsList from '../components/ProductsList'
import { ProductsContext } from '../Helpers/Context'
import { useContext } from 'react'

const Food = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { food } = products

  return (
    <>
      <ProductsList food={food} />
    </>
  )
}

export default Food
