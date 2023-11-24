import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Navigation = () => {
  // redirect immediately to /food so that the user doesn't see a blank page
  const navigate = useNavigate()

  return (
    <nav className='w-full min-w[240px] sticky top-0 bg-[#EAEAF5]'>
      <ul className='w-full p-4 flex justify-evenly gap-4 sm:gap-12 sm:justify-center'>
        <NavLink
          className='transition-all font-bold text-xl border-[2px] border-transparent text-[#ABA7A7] hover:text-[#2D2D2D] hover:border-t-[#F3C623]'
          to='/food'>
          Comida
        </NavLink>
        <NavLink
          className='transition-all font-bold text-xl border-[2px] border-transparent text-[#ABA7A7] hover:text-[#2D2D2D] hover:border-t-[#F3C623]'
          to='/drinks'>
          Bebidas
        </NavLink>
        <NavLink
          className='transition-all font-bold text-xl border-[2px] border-transparent text-[#ABA7A7] hover:text-[#2D2D2D] hover:border-t-[#F3C623]'
          to='/desserts'>
          Postres
        </NavLink>
      </ul>
    </nav>
  )
}

export default Navigation
