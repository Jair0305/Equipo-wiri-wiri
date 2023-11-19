import { Outlet } from 'react-router-dom'

import Header from './Header'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div className='h-screen w-full min-w-[320px] bg-[#EAEAF5]'>
      <Header />
      <Navigation />
      <main className='m-[0 auto] h-[650px] overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
