import munchEZLogo from '../assets/logos/MuncEZ-dark.svg'
import SvgUserMenu from './SvgUserMenu'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import CartFlotantButton from './CartFlotantButton'

const Header = ({ productsInCart, cartRef }) => {
  const [user, setUser] = useState('cashier')

  const userDisplay = {
    cashier: 'Cajero',
    kitchen: 'Cocina',
    admin: 'Admin',
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItemCount = productsInCart?.length
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'visible'
    }
  }, [menuRef])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpen])

  return (
    <header className='w-full bg-[#2D2D2D] flex flex-col lg:flex-row justify-between items-center'>
      <div className='flex items-center lg:w-2/4 lg:ml-4'>
        <img src={munchEZLogo} alt='MunchEZ logo' className='w-[100px] sm:w-[130px] p-4' />
        <h1 className='text-xl sm:text-3xl text-white font-bold'>MunchEZ</h1>
      </div>

      <div className='lg:py-4 lg:px-8 w-full lg:w-2/4 flex flex-col lg:flex-row  items-center gap-2 sm:gap-4' ref={menuRef}>
        <div className='flex items-center justify-between lg:justify-end gap-2 lg:gap-8 w-full px-6'>
          <h1 className='text-[#F3C623] font-bold text-sm lg:text-base xl:text-lg 2xl:text-xl text-center'>
            Dashboard <span>{userDisplay[user]}</span>
          </h1>
          <div className='flex justify-center items-center gap-2 lg:gap-8'>
            {user === 'cashier' && <CartFlotantButton cartItemCount={cartItemCount} cartRef={cartRef} />}
            <div
              className='flex justify-center items-center gap-2 p-4 rounded-lg hover:bg-[#3f3f3f] cursor-pointer transition-transform'
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FontAwesomeIcon className='text-white h-[20px]' icon={faGear} />
              <SvgUserMenu isMenuOpen={isMenuOpen} />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className={`fixed z-20 top-0 left-0 w-full h-full bg-[#1f1f1f] opacity-70 pointer-events-auto`}
              onClick={() => {
                setIsMenuOpen(false)
              }}
            />
            <div
              className={`z-20 transition-all absolute p-4 w-full lg:w-[200px] bg-[#2b2a2a] mx-4 ${
                isMenuOpen ? 'opacity-1 pointer-events-auto top-[25%] lg:top-[15%] lg:right-0' : 'opacity-0 pointer-events-none'
              }`}>
              <button className='w-full text-white'>Logout</button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
