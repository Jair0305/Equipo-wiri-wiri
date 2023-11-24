import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Order = ({ order }) => {
  const { description, name, num, orderDetails, ordertype } = order
  console.log(order)
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
    DELETE_ORDER: '¿Estás seguro de eliminar esta orden?',
  }

  const confirmAction = () => {
    // Implement logic based on the confirmation type
    if (confirmationType === 'MARK_AS_READY') {
      // Handle marking as ready
      console.log('Order marked as ready')
    } else if (confirmationType === 'DELETE_ORDER') {
      // Handle order deletion
      console.log('Order deleted')
    }

    // Close the modal
    handleCloseModal()
  }

  return (
    <div className='w-full max-h-[700px] flex-col justify-center items-center gap-4 border-[1px] bg-white border-[#ABA7A7] rounded-3xl p-4'>
      <section className='flex justify-start items-center gap-4'>
        <div className='bg-[#F3C623] w-[80px] h-[80px] flex justify-center items-center font-bold text-xl rounded-[50%]'>
          {num}
        </div>
        <div className='flex flex-col'>
          <p className='text-[24px]'>
            Orden de <span className='font-bold'>{name}</span>
          </p>
          <p className={`${ordertype === 'TAKEOUT' ? 'text-[#D8315B]' : 'text-[#F3C623]'}  text-[22px]`}>
            {getOrderType[ordertype]}
          </p>
        </div>
      </section>

      <section>
        <div className='flex flex-col justify-start items-start p-4 overflow-y-auto min-h-[200px] max-h-[200px] mt-4 pt-2'>
          {orderDetails.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className='flex justify-between items-center w-full border-b-[1px] border-[#ABA7A7] px-2 py-2 mt-2'>
              <p className='text-xl font-bold'>{product.productName}</p>
              <p className='text-xl font-bold'>x{product.det_amount}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='flex flex-col justify-center items-start mt-8 p-4 '>
        <p className='px-4 text-xl'>Notas Adicionales:</p>
        <div className='flex justify-between mt-4 w-full rounded-3xl border-[#ABA7A7] border-[1px]'>
          <textarea
            name='additional-notes'
            id='additionalNotes'
            className='w-full rounded-3xl px-4 py-2 resize-none h-[100px] text-lg font-bold'
            value={description}
            disabled></textarea>
        </div>
      </section>

      <section>
        <div className='flex justify-evenly items-center w-full mt-8'>
          <button
            className='w-[80px] h-[80px] border-[4px] border-[#3F9F7F] rounded-3xl text-[#3F9F7F] font-bold text-xl'
            onClick={() => handleOpenModal('MARK_AS_READY')}>
            <FontAwesomeIcon icon={faCheck} className='h-[40px]' />
          </button>
          <button
            className='w-[80px] h-[80px] border-[4px] border-[#D8315B] rounded-3xl text-[#D8315B] font-bold text-xl'
            onClick={() => handleOpenModal('DELETE_ORDER')}>
            <FontAwesomeIcon icon={faXmark} className='h-[40px]' />
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
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
}

export default Order
