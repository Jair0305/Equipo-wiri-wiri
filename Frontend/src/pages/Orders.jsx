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
    const intervalId = setInterval(() => {
      fetchOrders()
    }, 5000)

    // Limpiar el intervalo cuando el componente se desmonta o cuando 'orders' cambia
    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  useEffect(() => {
    // Primera carga al montar el componente
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
