import { useLoaderData } from 'react-router-dom'
import { getProducts } from '../api/products'
import ProductsList from '../components/ProductsList'

export async function loader() {
  // traer informacion de la api
  const products = await getProducts()
  return products.food
}

const Food = () => {
  const food = useLoaderData()

  return <ProductsList food={food} />
}

export default Food
