import React, { useState, useEffect } from 'react'
import { getAllOrders } from '../api/orders'
import PDF from '../components/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'flowbite-react'

const InfoCard = ({ title, content }) => (
  <Card className='max-w-sm'>
    <h3 className='text-lg font-semibold'>{title}</h3>
    <p>{content}</p>
  </Card>
)

const Resume = () => {
  const [todayOrders, setTodayOrders] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [ordersCompleted, setOrdersCompleted] = useState(0)
  const [ordersCanceled, setOrdersCanceled] = useState(0)
  const [averageSalePerOrder, setAverageSalePerOrder] = useState(0)
  const [topThreeSellingProducts, setTopThreeSellingProducts] = useState([])
  const [peakHours, setPeakHours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, today] = await Promise.all([getAllOrders(), isToday(new Date())])

        setTodayOrders(data.filter((order) => today(new Date(order.data))))
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (todayOrders.length === 0) return

    const dataPromises = [
      Promise.resolve(todayOrders.filter((order) => order.state === 'DELIVERED').length),
      Promise.resolve(todayOrders.filter((order) => order.state === 'CANCELLED').length),
      Promise.resolve(todayOrders.reduce((acc, order) => (order.state === 'DELIVERED' ? acc + order.total : acc), 0)),
    ]

    const productPromise = Promise.resolve(
      todayOrders.reduce((acc, order) => {
        order.orderDetails.forEach((detail) => {
          const { productName, det_amount } = detail
          acc[productName] = (acc[productName] || 0) + det_amount
        })
        return acc
      }, {})
    )

    Promise.all([...dataPromises, productPromise]).then(([completed, canceled, total, products]) => {
      setOrdersCompleted(completed)
      setOrdersCanceled(canceled)
      setTotalSales(total)

      const topThree = Object.entries(products)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)

      setTopThreeSellingProducts(topThree)
    })
  }, [todayOrders])

  useEffect(() => {
    if (todayOrders.length === 0 || ordersCompleted === 0) return

    setAverageSalePerOrder((totalSales / ordersCompleted).toFixed(2))
  }, [totalSales, ordersCompleted])

  useEffect(() => {
    if (todayOrders.length === 0) return

    const peakHoursToday = todayOrders.reduce((acc, order) => {
      const orderDate = new Date(order.data)
      const hour = orderDate.getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    }, {})

    const hours = Object.entries(peakHoursToday)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)

    const formattedHours = hours.map(([hour, count]) => [String(hour).padStart(2, '0'), count])

    setPeakHours(formattedHours)
  }, [todayOrders])

  const isToday = (date) => (otherDate) =>
    date.getDate() === otherDate.getDate() &&
    date.getMonth() === otherDate.getMonth() &&
    date.getFullYear() === otherDate.getFullYear()

  const todayDateString = new Date().toLocaleDateString()
  const pdfFileName = `Resumen-[${todayDateString}].pdf`

  return (
    <div className='m-auto max-w-[1224px] flex flex-col items-center space-y-4 bg-white gap-6 mt-8 rounded-lg p-4'>
      {todayOrders.length > 0 ? (
        <div className='flex flex-col justify-center items-center p-4'>
          <h2 className='text-2xl font-semibold'>Resumen de Ventas del Día</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8'>
            {/* Tarjeta para el Total de Ventas */}
            <InfoCard title='Total de Ventas' content={todayOrders.length} />

            {/* Tarjeta para Órdenes Completadas */}
            <InfoCard title='Órdenes Completadas' content={ordersCompleted} />

            {/* Tarjeta para Órdenes Canceladas */}
            <InfoCard title='Órdenes Canceladas' content={ordersCanceled} />

            {/* Tarjeta para Promedio de Venta por Orden */}
            <InfoCard title='Promedio de Venta por Orden' content={`$${averageSalePerOrder}`} />

            {/* Tarjeta para Top 3 de Productos Más Vendidos */}
            <InfoCard
              title='Top 3 de Productos Más Vendidos'
              content={
                <ul>
                  {topThreeSellingProducts.map(([productName, quantity], index) => (
                    <li key={index}>
                      {productName}: {quantity} unidades
                    </li>
                  ))}
                </ul>
              }
            />

            {/* Tarjeta para Horas Pico */}
            <InfoCard
              title='Horas Pico'
              content={
                <ul className='w-full'>
                  {peakHours.map(([hour, count], index) => (
                    <li key={index} className='w-full text-start'>
                      Hora: <span className='font-bold'>{hour}:00</span> hrs <br /> Cantidad de Órdenes:{' '}
                      <span className='font-bold'>{count}</span>
                      <hr className='pt-4' />
                    </li>
                  ))}
                </ul>
              }
            />

            {/* Tarjeta para Ganancias Totales */}
            <InfoCard title='Ganancias Totales' content={`$${totalSales}`} />
          </div>

          <PDFDownloadLink
            document={
              <PDF
                reportData={{
                  todayOrders,
                  totalSales,
                  ordersCompleted,
                  ordersCanceled,
                  averageSalePerOrder,
                  topThreeSellingProducts,
                  peakHours,
                  todayDateString,
                }}
              />
            }
            fileName={pdfFileName}>
            {({ loading: pdfLoading, url, error, blob }) => (
              <button className='mt-4 p-2 bg-green-500 text-white rounded-md' disabled={loading || pdfLoading}>
                <FontAwesomeIcon icon={loading || pdfLoading ? faHourglassStart : faDownload} />
                {loading || pdfLoading ? 'Cargando...' : 'Descargar Resumen'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      ) : (
        <p className='text-xl font-semibold'>No hay órdenes de hoy {todayDateString}</p>
      )}
    </div>
  )
}

export default Resume
