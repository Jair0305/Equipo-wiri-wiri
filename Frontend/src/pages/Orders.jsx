import Order from '../components/Order'
import { getOrders } from '../api/orders'
import { useState, useEffect } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])

  // Llamada a la API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersFetched = await getOrders()
        setOrders(ordersFetched)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className='mx-auto max-w-screen-xl flex justify-center m-8 h-[calc(100vh-200px)] overflow-y-auto px-8'>
      {orders.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className='text-center text-3xl mt-10'>No hay órdenes por hoy.</p>
      )}
    </div>
  )
}

export default Orders
