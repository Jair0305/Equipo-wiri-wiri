import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const ProductInCart = ({ product, setProductsInCart }) => {
  const { id, name, price } = product
  const [localQuantity, setLocalQuantity] = useState(product.quantity || 1)

  const handleDecrement = (e) => {
    e.preventDefault()
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1)
      updateProductQuantity(id, localQuantity - 1)
    }
  }

  const handleIncrement = (e) => {
    e.preventDefault()
    setLocalQuantity(localQuantity + 1)
    updateProductQuantity(id, localQuantity + 1)
  }
  const handleRemove = () => {
    removeProductFromCart(id)
  }

  const updateProductQuantity = (productId, newQuantity) => {
    setProductsInCart((prevProducts) =>
      prevProducts.map((prevProduct) => (prevProduct.id === productId ? { ...prevProduct, quantity: newQuantity } : prevProduct))
    )
  }

  const removeProductFromCart = (productId) => {
    setProductsInCart((prevProducts) => prevProducts.filter((prevProduct) => prevProduct.id !== productId))
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 py-1 border-[#707070] border-opacity-[0.2]'>
      <h3 className='w-2/6 xl:1/6 font-bold text-sm lg:text-sm'>{name}</h3>
      <div className='w-2/6 xl:3/6 flex justify-center items-center'>
        <FontAwesomeIcon
          icon={faCircleMinus}
          onClick={handleDecrement}
          className='h-[30px] cursor-pointer p-2 text-sm lg:text-sm'
        />
        <span className='text-base  '>x{localQuantity}</span>
        <FontAwesomeIcon icon={faCirclePlus} onClick={handleIncrement} className='h-[30px] cursor-pointer p-2 text-black' />
      </div>
      <p className='w-1.5/5 font-bold text-sm'>${(price * localQuantity).toFixed(2)}</p>
      <button className='w-0.5/6 ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  )
}

ProductInCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number, // Ensure quantity is a number
  }).isRequired,
  setProductsInCart: PropTypes.func.isRequired,
}

export default ProductInCart
