import Product from './Product3'
import PropTypes from 'prop-types'

const ProductsListDesserts = ({ desserts }) => {
  return (
    <>
      {desserts.length ? (
        <div className='flex flex-col gap-8 m-8 m-[0 auto] h-[calc(100vh-280px)] overflow-y-auto'>
          {desserts.map((desserts) => (
            <Product key={desserts?.id} desserts={desserts} />
          ))}
        </div>
      ) : (
        <p>Theres no desserts for today</p>
      )}
    </>
  )
}

ProductsListDesserts.propTypes = {
  desserts: PropTypes.array.isRequired,
}

export default ProductsListDesserts
