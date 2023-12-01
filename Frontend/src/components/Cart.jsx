import { forwardRef, useContext, useEffect, useState } from 'react'
//helpers
import { OrdersContext, ProductsInCartContext } from '../Helpers/Context'
// components
import ProductInCart from './ProductInCart'
// icons FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'

//toastify
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { postOrder } from '../api/products'
import { getOrders } from '../api/orders'

const Cart = forwardRef(function Cart(props, ref) {
  const { orders, setOrders } = useContext(OrdersContext)

  const fetchOrders = async () => {
    try {
      const ordersFetched = await getOrders()
      setOrders(ordersFetched)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const { productsInCart, setProductsInCart } = useContext(ProductsInCartContext)

  const [orderNumber, setOrderNumber] = useState(() => {
    const savedOrderNumber = localStorage.getItem('orderNumber')
    return savedOrderNumber ? parseInt(savedOrderNumber, 10) : 1
  })

  const [customerName, setCustomerName] = useState('')
  const [isTakeout, setIsTakeout] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState('')
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

  const handleAdditionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value)
  }

  const handleTakeoutChange = (e) => {
    setIsTakeout(e.target.checked)
  }

  const calculateTotal = () => {
    return productsInCart
      .reduce((acc, curr) => {
        const productQuantity = curr.quantity || 1
        return acc + curr.price * productQuantity
      }, 0)
      .toFixed(2)
  }

  const clearForm = () => {
    setCustomerName('')
    setAdditionalNotes('')
    setIsTakeout(false)
    setTotal(0)
    setProductsInCart([]) // Limpiar el carrito o ajustar según tu lógica
  }

  const notify = () =>
    toast.success('Orden enviada correctamente 📨', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // verificar que todos los campos del formulario estén completos
    if (!customerName || !productsInCart.length) {
      return
    }

    // Obtener la fecha y hora actual en el formato deseado
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString()

    // calc total
    const calculatedTotal = calculateTotal()

    // Construir la lista de detalles
    const orderDetails = productsInCart.map((product) => ({
      det_pro_id: product.id,
      det_amount: product.quantity || 1,
    }))

    // Construir el objeto de datos
    const orderData = {
      data: formattedDate,
      total: calculatedTotal,
      ordertype: isTakeout ? 'TAKEOUT' : 'FOR_HERE',
      active: true,
      num: orderNumber.toString(),
      name: customerName,
      state: 'IN_PROCESS',
      description: additionalNotes,
      details: orderDetails,
    }

    try {
      console.log(orderData)
      const response = await postOrder(orderData)
      if (response) {
        notify()
        clearForm()
        fetchOrders()
        setOrderNumber(orderNumber + 1)
      } else {
        console.error('Failed to send order:', response.statusText)
      }
    } catch (error) {
      console.error('Error sending order:', error)
    }
  }
  useEffect(() => {
    // Set orderNumber in localStorage every time it changes
    localStorage.setItem('orderNumber', orderNumber.toString())
  }, [orderNumber])

  useEffect(() => {
    const lastOrderDate = localStorage.getItem('lastOrderDate')
    const today = new Date().toLocaleDateString()

    if (lastOrderDate !== today) {
      setOrderNumber(1)
      localStorage.setItem('lastOrderDate', today)
    }
  }, [orderNumber, productsInCart])

  return (
    <aside
      ref={ref}
      className={`py-8 px-6 lg:px-0 lg:mr-6 lg:py-0 w-full lg:mt-10 h-full right-0 block bg-[#F7F6FF] z-10 lg:relative lg:w-2/5 xl:mr-[5%] xl:1/5 2xl:mr-[10%]`}>
      <form onSubmit={handleSubmit} className='bg-[#F7F6FF] border-[1px] border-[#ABA7A7] p-5 rounded-md'>
        {/* Order Summary */}
        <section className='flex justify-start items-center gap-4'>
          {/* Order */}
          <div className='bg-[#F3C623] w-[60px] h-[60px] flex justify-center items-center font-bold text-xl rounded-[50%]'>
            {orderNumber}
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
            maxLength={250}
            value={additionalNotes}
            onChange={handleAdditionalNotesChange}></textarea>
        </section>
        {/* Button to Send order | Clear form  */}
        <section className='w-full flex justify-evenly mt-8'>
          <button type='submit' className='border-4 border-[#3F9F7F] px-6 py-4 rounded-[20px] text-[#3F9F7F] font-bold text-xl'>
            <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
            Ordenar
          </button>
          <button
            type='button'
            className='border-4 border-[#D8315B] px-6 py-4 rounded-[20px] text-[#D8315B] font-bold text-xl'
            onClick={clearForm}>
            <FontAwesomeIcon icon={faXmark} className='mr-2' />
            Limpiar
          </button>
        </section>
      </form>
    </aside>
  )
})

export default Cart
