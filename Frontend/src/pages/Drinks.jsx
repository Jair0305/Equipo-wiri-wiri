import { useLoaderData } from 'react-router-dom'
import { getProducts } from '../api/products'
import ProductsListDrink from '../components/ProductsListDrink'

export async function loaderdrink() {
  // traer informacion de la api
  const products = await getProducts()
  return products.drinks
}

const Drinks = () => {
  const drinks = useLoaderData()
  return <ProductsListDrink drinks={drinks} />
}

export default Drinks
