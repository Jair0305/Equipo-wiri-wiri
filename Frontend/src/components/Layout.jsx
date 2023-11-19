import { Outlet } from 'react-router-dom'

import Header from './Header'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div className='h-screen w-full min-w-[320px] bg-[#EAEAF5]'>
      <Header />
      <div className='flex flex-col lg:flex-row'>
        <main className='lg:w-3/5 xl:4/5 xl:ml-[5%] 2xl:ml-[10%]'>
          <Navigation />
          <Outlet />
        </main>

        <aside className='py-8 pr-6 lg:w-2/5 xl:mr-[5%] xl:1/5 2xl:mr-[10%]'>
          <div className='bg-[#F7F6FF] border-[1px] border-[#ABA7A7] p-5 rounded-md'>
            <div className='flex justify-start items-center gap-4 p-4'>
              <div className='bg-[#F3C623] w-[60px] h-[60px] flex justify-center items-center font-bold text-xl rounded-[50%]'>
                12
              </div>
              <h3 className='text-[24px] xl:text-[30px]'>Detalles de la orden</h3>
            </div>
            <ul>
              <li>Característica 1</li>
              <li>Característica 2</li>
              <li>Característica 3</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Layout
