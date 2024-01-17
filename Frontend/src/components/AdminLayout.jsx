import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLayout = () => {
  return (
    <div className='h-auto min-h-screen lg:h-screen w-full min-w-[400px] m-auto bg-[#EAEAF5]'>
      {/* Header */}
      <Header />
      {/* Products */}
      <div className='w-full'>
        <main className='w-full mx-0 px-8 bg-[#EAEAF5]'>
          <Navigation />
          <Outlet />
        </main>
        <ToastContainer className='mt-32 z-10' />
      </div>
    </div>
  )
}

export default AdminLayout
