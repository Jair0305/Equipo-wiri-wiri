import PropTypes from 'prop-types'
import foodImg from '../assets/images/food.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Product = ({ food, productsInCart, setProductsInCart }) => {
  const { name, description, price, id } = food
  const product = { id, name, description, price }

  const addToCart = () => {
    const isProductInCart = productsInCart.some((cartProduct) => cartProduct.id === product.id)

    if (!isProductInCart) {
      setProductsInCart((prevProducts) => {
        const updatedProducts = [...prevProducts, product]
        return updatedProducts
      })
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 items-center shadow-xl bg-[#F7F6FF] mr-2 mb-8 '>
        <div className='md:col-span-1'>
          <img src={foodImg} alt={name} className='w-full h-auto' />
        </div>
        <div className='md:col-span-1'>
          <h2 className='text-lg font-bold'>{name}</h2>
          <p className='text-sm'>{description}</p>
        </div>
        <div className='md:col-span-1 sm:justify-self-center'>
          <p className='text-lg font-bold'>${price}</p>
        </div>
        <div className='md:col-span-1 justify-self-center'>
          <FontAwesomeIcon
            icon={faPlus}
            className='shadow-md transition-all h-[1.5rem] w-[1.5rem] p-2 cursor-pointer rounded-[50%] text-[#F3C623] hover:bg-[#F3C623] hover:text-[white]'
            onClick={addToCart}
          />
        </div>
      </div>
    </>
  )
}

Product.propTypes = {
  food: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}

export default Product
