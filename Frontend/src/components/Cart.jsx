import { useContext, useEffect, useState } from 'react'
//helpers
import { ProductsInCartContext } from '../Helpers/Context'
// components
import ProductInCart from './ProductInCart'
// icons FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
  const { productsInCart, setProductsInCart } = useContext(ProductsInCartContext)

  const [customerName, setCustomerName] = useState('')
  const [isTakeout, setIsTakeout] = useState(false) // New state for takeout option
  const [total, setTotal] = useState(0)

  const [isTextFocused, setIsTextFocused] = useState(false)

  const handleTextFocus = () => {
    setIsTextFocused(true)
  }

  const handleTextBlur = () => {
    setIsTextFocused(false)
  }

  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }

  const handleInputChange = (e) => {
    setCustomerName(e.target.value)
  }

  const handleTakeoutChange = (e) => {
    setIsTakeout(e.target.checked)
  }

  const calculateTotal = () => {
    return productsInCart
      .reduce((acc, curr) => {
        const productQuantity = curr.quantity || 1 // Assume a default quantity of 1
        return acc + curr.price * productQuantity
      }, 0)
      .toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const updatedTotal = calculateTotal()
    setTotal(updatedTotal)
  }, [productsInCart])

  return (
    <aside className='py-8 px-6 lg:w-2/5 xl:mr-[5%] xl:1/5 2xl:mr-[10%]'>
      <form onSubmit={handleSubmit} className='bg-[#F7F6FF] border-[1px] border-[#ABA7A7] p-5 rounded-md'>
        {/* Order Summary */}
        <section className='flex justify-start items-center gap-4'>
          {/* Order */}
          <div className='bg-[#F3C623] w-[60px] h-[60px] flex justify-center items-center font-bold text-xl rounded-[50%]'>
            12
          </div>
          <div className='flex justify-between text-xl'>
            <h3 htmlFor='customerName' className='text-[24px] xl:text-[30px]'>
              Orden de:
            </h3>
          </div>
          <div
            className={`inset-0 ${
              isTextFocused ? 'border-black' : 'border-[#F3C623]'
            } p-2 bg-[#F3C623]  border-2 outline-none rounded-lg py-1`}>
            <input
              id='customerName'
              type='text'
              className='text-black bg-[#F3C623] outline-none border-none w-[100px] text-center'
              value={customerName}
              onChange={handleInputChange}
              onFocus={handleTextFocus}
              onBlur={handleTextBlur}
              onKeyDown={handleTextKeyDown}
              autoComplete='off'
            />
          </div>
        </section>
        {/* Products in cart */}
        <section className='flex flex-col justify-start items-center p-4 overflow-y-auto max-h-[300px] mt-4 pt-2'>
          {productsInCart.length ? (
            productsInCart.map((product) => (
              <ProductInCart key={product.id} product={product} setProductsInCart={setProductsInCart} />
            ))
          ) : (
            <p className='text-sm font-bold'>No hay productos seleccionados.</p>
          )}
        </section>
        {/* To go or to stay and Total */}
        <section className='flex justify-between items-center p-4'>
          <div className='flex justify-end'>
            <label htmlFor='takeout' className='text-xl'>
              <input id='takeout' type='checkbox' checked={isTakeout} onChange={handleTakeoutChange} className='mr-2' />
              Para llevar
            </label>
          </div>

          <div className='flex justify-end'>
            <h3 className='text-xl text-[#ABA7A7]'>
              Total: <span className='text-xl font-bold text-black'>${calculateTotal()}</span>
            </h3>
          </div>
        </section>
        {/* Additional Notes */}
        <section className='flex justify-between mt-4 w-full rounded-3xl overflow-hidden border-[#ABA7A7] border-[1px]'>
          <textarea
            name='additional-notes'
            id='additionalNotes'
            placeholder='Notas Adicionales'
            className='w-full min-h-[120px] max-h-[120px] rounded-3xl px-4 py-2  resize-none text-lg'
            maxLength={250}></textarea>
        </section>
        {/* Button to Send order | Clear form  */}
        <section className='w-full flex justify-evenly mt-8'>
          <button className='border-4 border-[#3F9F7F] px-6 py-4 rounded-[20px] text-[#3F9F7F] font-bold text-xl'>
            <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
            Ordenar
          </button>
          <button className='border-4 border-[#D8315B] px-6 py-4 rounded-[20px] text-[#D8315B] font-bold text-xl'>
            <FontAwesomeIcon icon={faXmark} className='mr-2' />
            Limpiar
          </button>
        </section>
      </form>
    </aside>
  )
}

export default Cart
