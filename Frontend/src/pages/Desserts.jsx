import ProductsListDesserts from '../components/ProductsListDesserts'
import { ProductsContext } from '../Helpers/Context'
import { useContext } from 'react'

const Desserts = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { desserts } = products

  return (
    <>
      <ProductsListDesserts desserts={desserts} />
    </>
  )
}

export default Desserts
