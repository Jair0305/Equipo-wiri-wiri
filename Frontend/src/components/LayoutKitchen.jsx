import { Outlet } from 'react-router-dom'
import Header from './Header'
// import { getOrders } from '../api/orders'

const LayoutKitchen = () => {
  // const [orders, setOrders] = useState([])
  // // Call api for data and fill global state
  // useEffect(() => {
  //   const fetchorders = async () => {
  //     const ordersFetched = await getorders()
  //     setOrders(ordersFetched)
  //   }
  //   fetchProducts().catch(console.error)
  // }, [])

  return (
    // Pass global state to children
    <div className='h-screen w-full min-w-[420px] m-auto bg-[#EAEAF5]'>
      {/* Header */}
      <Header />
      {/* Products */}
      <div className='flex flex-col lg:flex-row'>
        <main className='lg:w-3/5 xl:4/5 xl:ml-[5%] 2xl:ml-[10%]'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutKitchen
