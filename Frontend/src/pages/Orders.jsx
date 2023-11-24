import Order from '../components/Order'
import { getOrders } from '../api/orders'
import { useState, useEffect } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])

  // Call api
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersFetched = await getOrders()
        setOrders(ordersFetched)
        console.log(ordersFetched)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])

  return (
    <>
      {orders.length ? (
        <div className='flex flex-col m-8 m-[0 auto] h-[calc(100vh-280px)] overflow-y-auto'>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className='text-center text-3xl mt-[10%]'>No hay ordenes por hoy.</p>
      )}
    </>
  )
}

export default Orders
