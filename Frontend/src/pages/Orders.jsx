import Order from '../components/Order'
import { getOrders } from '../api/orders'
import { useState, useEffect } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])

  // Call api
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersFetched = await getOrders()
      setOrders(ordersFetched)
    }
    fetchOrders().catch(console.error)
  }, [])

  return (
    <>
      {orders.length ? (
        <div className='flex flex-col m-8 m-[0 auto] h-[calc(100vh-280px)] overflow-y-auto '>
          {orders.map((order) => (
            <Order key={order?.id} orders={order} />
          ))}
        </div>
      ) : (
        <p className='text-center text-3xl mt-[10%]'>No hay ordenes por hoy.</p>
      )}
    </>
  )
}

export default Orders
