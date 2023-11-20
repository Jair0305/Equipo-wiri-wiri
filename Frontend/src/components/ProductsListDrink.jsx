import Product from './Product2'
import PropTypes from 'prop-types'

const ProductsListDrink = ({ drinks }) => {
  return (
    <>
      {drinks.length ? (
        <div className='flex flex-col gap-8 m-8 m-[0 auto] h-[calc(100vh-280px)] overflow-y-auto'>
          {drinks.map((drinks) => (
            <Product key={drinks?.id} drinks={drinks} />
          ))}
        </div>
      ) : (
        <p>Theres no drinks for today</p>
      )}
    </>
  )
}

ProductsListDrink.propTypes = {
  drinks: PropTypes.array.isRequired,
}

export default ProductsListDrink
