import Product from './Product'
import PropTypes from 'prop-types'

const ProductsList = ({ food }) => {
  return (
    <>
      {food.length ? (
        <div className='flex flex-col gap-8 m-8 m-[0 auto] h-[calc(100vh-280px)] overflow-y-auto'>
          {food.map((food) => (
            <Product key={food?.id} food={food} />
          ))}
        </div>
      ) : (
        <p>Theres no food for today</p>
      )}
    </>
  )
}

ProductsList.propTypes = {
  food: PropTypes.array.isRequired,
}

export default ProductsList
