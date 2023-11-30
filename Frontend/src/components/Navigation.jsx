import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../Helpers/useAuth'

const Navigation = () => {
  const { role } = useAuth()

  return (
    <nav className='w-full min-w[240px] sticky top-0 bg-[#EAEAF5]'>
      <ul className='w-full p-4 flex justify-evenly gap-4 sm:gap-12 sm:justify-center'>
        <NavLink
          className='transition-all font-bold text-xl border-[2px] border-transparent text-[#ABA7A7] hover:text-[#2D2D2D] hover:border-t-[#F3C623]'
          to={role === 'ADMIN' ? '/admin/dashboard/employees' : '/cashier/food'}>
          {role === 'ADMIN' ? 'Empleados' : 'Comida'}
        </NavLink>
        <NavLink
          className='transition-all font-bold text-xl border-[2px] border-transparent text-[#ABA7A7] hover:text-[#2D2D2D] hover:border-t-[#F3C623]'
          to={role === 'ADMIN' ? '/admin/dashboard/products' : '/cashier/drinks'}>
          {role === 'ADMIN' ? 'Productos' : 'Bebidas'}
        </NavLink>
        <NavLink
          className='transition-all font-bold text-xl border-[2px] border-transparent text-[#ABA7A7] hover:text-[#2D2D2D] hover:border-t-[#F3C623]'
          to={role === 'ADMIN' ? '/admin/dashboard/orders' : '/cashier/desserts'}>
          {role === 'ADMIN' ? 'Ordenes' : 'Postres'}
        </NavLink>
      </ul>
    </nav>
  )
}

export default Navigation
