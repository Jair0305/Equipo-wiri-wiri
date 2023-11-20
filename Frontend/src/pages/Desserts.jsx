import { useLoaderData } from 'react-router-dom'
import { getProducts } from '../api/products'
import ProductsListDesserts from '../components/ProductsListDesserts'

export async function loaderdesserts() {
  // traer informacion de la api
  const products = await getProducts()
  return products.desserts
}

const Desserts = () => {
  const desserts = useLoaderData()
  return <ProductsListDesserts desserts={desserts} />
}

export default Desserts
