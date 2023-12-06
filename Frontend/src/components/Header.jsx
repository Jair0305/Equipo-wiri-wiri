import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Helpers/useAuth'
import { faArrowRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons'
import CartFlotantButton from './CartFlotantButton'
import SvgUserMenu from './SvgUserMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import munchEZLogo from '../assets/logos/MunchEZ-dark-christmas.svg'

const Header = ({ productsInCart, cartRef, error }) => {
  const navigate = useNavigate()
  const { logout, role } = useAuth()

  const displayRole = {
    ADMIN: 'Administrador',
    CASHIER: 'Cajero',
    KITCHEN: 'Cocina',
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItemCount = productsInCart?.length
  const menuRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
          <div className='font-bold text-base lg:text-xl xl:text-2xl  text-center'>
            <h1 className='text-center text-[#F3C623]'>
              Dashboard{' '}
              <span className='text-[#c0c0c0]'>
                {displayRole[role]} <span className='text-[40px] text-[#F3C623]'>.</span>
              </span>
            </h1>
          </div>
          {/* <div className=''>
            <h1 className='text-center text-3xl font-extrabold text-blue-900'>
              CRM - Clients<span className='text-orange-300 text-4xl'>.</span>
            </h1>
          </div> */}
          <div className='flex justify-center items-center gap-2 lg:gap-8'>
            {role === 'CASHIER' && <CartFlotantButton cartItemCount={cartItemCount} cartRef={cartRef} />}
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
              className={`z-20 transition-all absolute py-4 w-full lg:w-[250px] bg-[#2b2a2a] hover:hover:bg-[#3f3f3f] mx-4 rounded-lg ${
                isMenuOpen ? 'opacity-1 pointer-events-auto top-[25%] lg:top-[15%] lg:right-0' : 'opacity-0 pointer-events-none'
              }`}>
              <button className='w-full flex justify-center items-center gap-2 text-white text-xl ' onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='h-[20px]' />
                Cerrar Sesion
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  productsInCart: PropTypes.array,
  cartRef: PropTypes.object,
  error: PropTypes.string,
}

export default Header
