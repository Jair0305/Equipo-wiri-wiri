import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { cancelOrderApi, markOrderAsReadyApi } from '../api/orders'

const Order = ({ order, fetchOrders }) => {
  const { id, description, name, num, orderDetails, ordertype } = order
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)

  const handleOpenModal = (type) => {
    setIsModalOpen(true)
    setConfirmationType(type)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setConfirmationType(null)
  }

  const getOrderType = {
    TAKEOUT: 'Para llevar',
    FOR_HERE: 'Para comer aquí',
  }

  const confirmationMessages = {
    MARK_AS_READY: '¿Estás seguro de marcar esta orden como lista?',
    DELETE_ORDER: '¿Estás seguro de cancelar esta orden?',
  }

  const cancelOrder = async () => {
    // Implement logic to cancel order
    try {
      const response = await cancelOrderApi(id)
      if (!response.ok) {
        throw new Error('Error cancelling order')
      }
    } catch (error) {
      console.error('Error cancelling order:', error)
    }
    await fetchOrders()
  }

  const markOrderAsReady = async () => {
    // Implement logic to mark order as ready
    try {
      const response = await markOrderAsReadyApi(id)
      if (!response.ok) {
        throw new Error('Error marking order as ready')
      }
    } catch (error) {
      console.error('Error marking order as ready:', error)
    }
    await fetchOrders()
  }

  const confirmAction = () => {
    // Implement logic based on the confirmation type
    if (confirmationType === 'MARK_AS_READY') {
      // Handle marking as ready
      markOrderAsReady()
    } else if (confirmationType === 'DELETE_ORDER') {
      // Handle order deletion
      cancelOrder()
    }

    // Close the modal
    handleCloseModal()
  }

  return (
    <div className='w-full max-w-md mx-auto border-[1px] bg-white border-[#ABA7A7] rounded-3xl p-4'>
      <section className='flex flex-col items-center gap-4'>
        <div className='bg-[#F3C623] w-[80px] h-[80px] flex justify-center items-center font-bold text-xl rounded-[50%]'>
          {num}
        </div>
        <div className='text-center'>
          <p className='text-[24px]'>
            Orden de <span className='font-bold'>{name}</span>
          </p>
          <p className={`${ordertype === 'TAKEOUT' ? 'text-[#D8315B]' : 'text-[#F3C623]'} text-[22px]`}>
            {getOrderType[ordertype]}
          </p>
        </div>
      </section>

      <section className='p-4 overflow-y-auto min-h-[200px] max-h-[200px]'>
        {orderDetails.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className='flex justify-between items-center w-full border-b-[1px] border-[#ABA7A7] px-2 py-2 mt-2'>
            <p className='text-lg font-bold'>{product.productName}</p>
            <p className='text-xl font-bold opacity-60'>x{product.det_amount}</p>
          </div>
        ))}
      </section>

      <section className='p-4'>
        <p className='text-xl'>Notas Adicionales:</p>
        <div className='mt-4 '>
          <textarea
            name='additional-notes'
            id='additionalNotes'
            className={`w-full rounded-3xl px-4 py-2 resize-none h-[100px] text-lg ${
              description === '' ? 'font-bold italic opacity-40 select-none' : 'font-bold'
            }`}
            value={description === '' ? 'Sin notas adicionales' : description}
            disabled></textarea>
        </div>
      </section>

      <section className='flex justify-evenly items-center mt-4'>
        <button
          className='w-[80px] h-[80px] border-[4px] border-[#3F9F7F] rounded-3xl text-[#3F9F7F] font-bold text-xl'
          onClick={() => handleOpenModal('MARK_AS_READY')}>
          <FontAwesomeIcon icon={faCheck} className='h-[40px]' />
        </button>
        <button
          className='w-[80px] h-[80px] border-[4px] border-[#D8315B] rounded-3xl text-[#D8315B] font-bold text-xl'
          onClick={() => handleOpenModal('DELETE_ORDER')}>
          <FontAwesomeIcon icon={faTrash} className='h-[30px]' />
        </button>
      </section>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10'>
          <div className='bg-white p-8 rounded-lg'>
            <p className='text-xl font-bold mb-4'>{confirmationMessages[confirmationType]}</p>
            <div className='flex justify-evenly'>
              <button className='bg-[#3F9F7F] text-white px-4 py-2 rounded-md mr-4' onClick={confirmAction}>
                Confirmar
              </button>
              <button className='bg-[#D8315B] text-white px-4 py-2 rounded-md' onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
            <button className='absolute top-4 right-4 text-gray-600 hover:text-gray-800' onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} className='h-6 w-6' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  fetchOrders: PropTypes.func.isRequired,
}

export default Order
