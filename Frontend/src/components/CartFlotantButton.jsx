import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const CartFlotantButton = ({ cartItemCount, cartRef }) => {
  const handleClick = () => {
    // Hacer scroll hacia el componente Cart
    if (cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className='lg:hidden flex items-center justify-center cursor-pointer' onClick={handleClick}>
      {/* Contenedor del botón flotante */}
      <div className='relative'>
        {/* Contenido del botón */}
        <div className='m-2 w-14 h-14 bg-[#F3C623] rounded-full flex justify-center items-center'>
          <FontAwesomeIcon icon={faClipboard} className='text-black text-3xl' />
        </div>
        {/* Contador de productos */}
        {cartItemCount > 0 && (
          <span className='absolute top-1 right-1 bg-red-500 text-white font-bold text-base px-2 py-0 rounded-full'>
            {cartItemCount}
          </span>
        )}
      </div>
    </div>
  )
}

export default CartFlotantButton
