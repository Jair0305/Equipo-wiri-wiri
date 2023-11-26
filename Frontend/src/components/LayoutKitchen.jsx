import { Outlet } from 'react-router-dom'
import Header from './Header'
import { OrdersContext } from '../Helpers/Context'
import { useState } from 'react'

const LayoutKitchen = () => {
  const [orders, setOrders] = useState([])
  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      <div className='h-auto lg:h-screen w-full min-w-[400px] m-auto bg-[#EAEAF5]'>
        {/* Header */}
        <Header />
        {/* Products */}
        <div className='w-full'>
          <main className='flex justify-center w-full px-8 py-4 overflow-y-auto'>
            <Outlet />
          </main>
        </div>
      </div>
    </OrdersContext.Provider>
  )
}

export default LayoutKitchen
