import PropTypes from 'prop-types'
import foodImg from '../assets/images/food.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

const Product = ({ food, productsInCart, setProductsInCart }) => {
  const { name, description, price, id } = food
  const product = { id, name, description, price }

  const isProductInCart = productsInCart.some((cartProduct) => cartProduct.id === product.id)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const addToCart = () => {
    setProductsInCart((prevProducts) => {
      const updatedProducts = [...prevProducts, product]
      return updatedProducts
    })
  }

  useEffect(() => {
    let timeoutId

    if (isAddedToCart) {
      // Después de 1.5 segundos, restablece el estado y deshabilita el botón si el producto está en el carrito
      timeoutId = setTimeout(() => {
        setIsAddedToCart(false)
      }, 1500)
    }

    return () => clearTimeout(timeoutId)
  }, [isAddedToCart])

  const handleAddToCartClick = () => {
    if (!isProductInCart) {
      addToCart()
      setIsAddedToCart(true)
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
          <button
            disabled={isProductInCart}
            className={`shadow-md transition-all p-2 cursor-pointer rounded-[50%] flex justify-center items-center
            text-${isAddedToCart ? 'white' : '[#F3C623]'}
            bg-${isAddedToCart ? 'green-500' : 'white'}
            ${isProductInCart ? 'pointer-events-none opacity-50' : 'hover:bg-[#F3C623] hover:text-white'}
            `}
            onClick={handleAddToCartClick}>
            <FontAwesomeIcon className='h-[1.5rem] w-[1.5rem]' icon={isAddedToCart ? faCheck : faPlus} />
          </button>
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
  productsInCart: PropTypes.array.isRequired,
  setProductsInCart: PropTypes.func.isRequired,
}

export default Product
