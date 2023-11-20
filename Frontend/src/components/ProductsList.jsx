import Product from './Product'
import PropTypes from 'prop-types'

const ProductsList = ({ food, productsInCart, setProductsInCart }) => {
  return (
    <>
      {food.length ? (
        <div className='flex flex-col m-8 m-[0 auto] h-[calc(100vh-280px)] overflow-y-auto '>
          {food.map((food) => (
            <Product key={food?.id} food={food} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
          ))}
        </div>
      ) : (
        <p className='text-center text-3xl mt-[10%]'>No hay comida por hoy.</p>
      )}
    </>
  )
}

ProductsList.propTypes = {
  food: PropTypes.array.isRequired,
  productsInCart: PropTypes.array.isRequired,
  setProductsInCart: PropTypes.func.isRequired,
}

export default ProductsList
