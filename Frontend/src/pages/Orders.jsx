import Order from '../components/Order'
import { useEffect, useContext } from 'react'
import { getOrders } from '../api/orders'
import { OrdersContext } from '../Helpers/Context'

const Orders = () => {
  const { orders, setOrders } = useContext(OrdersContext)

  const fetchOrders = async () => {
    try {
      const ordersFetched = await getOrders()
      setOrders(ordersFetched)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setInterval(() => {
      fetchOrders()
    }, 15000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  return (
    <div className='mx-4 max-w-screen-xl flex justify-center h-screen md:h-[calc(100vh-220px)] overflow-y-auto pr-6'>
      {orders.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {orders.map((order) => (
            <Order key={order.id} order={order} fetchOrders={fetchOrders} />
          ))}
        </div>
      ) : (
        <p className='text-center text-xl sm:text-3xl mt-10'>No hay órdenes por hoy.</p>
      )}
    </div>
  )
}

export default Orders
