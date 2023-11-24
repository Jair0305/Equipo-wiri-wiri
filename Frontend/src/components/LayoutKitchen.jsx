import { Outlet } from 'react-router-dom'
import Header from './Header'

const LayoutKitchen = () => {
  return (
    <div className='h-auto lg:h-screen w-full min-w-[400px] m-auto bg-[#EAEAF5]'>
      {/* Header */}
      <Header />
      {/* Products */}
      <div className='w-full'>
        <main className='w-full mx-auto px-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutKitchen
