import { Outlet } from 'react-router-dom'
import Header from './Header'

const LayoutKitchen = () => {
  return (
    <div className='h-auto w-full min-w-[420px] m-auto bg-[#EAEAF5]'>
      {/* Header */}
      <Header />
      {/* Orders */}
      <div className='flex overflow-y-hidden'>
        <main className='w-full h-full overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutKitchen
