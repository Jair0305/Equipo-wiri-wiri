import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'

const AdminLayout = () => {
  return (
    <div className='h-auto lg:h-screen w-full min-w-[400px] m-auto bg-[#EAEAF5]'>
      {/* Header */}
      <Header />
      {/* Products */}
      <div className='w-full'>
        <main className='w-full mx-0 px-8'>
          <Navigation />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
