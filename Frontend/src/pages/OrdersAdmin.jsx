import { useEffect, useState } from 'react'
import { Pagination, Select, Table } from 'flowbite-react'
import { getAllOrders } from '../api/orders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const OrdersAdmin = () => {
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filterCriteria, setFilterCriteria] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [columnSortOrder, setColumnSortOrder] = useState({
    id: 'asc',
    state: 'asc',
    total: 'asc',
    data: 'asc',
  })

  const fetchOrders = async () => {
    const data = await getAllOrders()
    setAllOrders(data)
    setFilteredOrders(data) // Inicialmente, muestra todas las órdenes
  }

  const ordersPerPage = 10

  const calculateTotalPages = () => Math.ceil(filteredOrders.length / ordersPerPage)
  const totalPages = calculateTotalPages()
  const onPageChange = (page) => setCurrentPage(page)

  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const ordersToDisplay = filteredOrders.slice(startIndex, endIndex)

  const orderStateDisplay = {
    CANCELLED: 'Cancelada',
    DELIVERED: 'Entregada',
    IN_PROCESS: 'En proceso',
  }

  const orderTypeDisplay = {
    TAKEOUT: 'Para llevar',
    FOR_HERE: 'Para comer aquí',
  }

  const formatDate = (dateArray) => {
    const formattedDate = new Date(...dateArray)
    const formattedYear = formattedDate.getFullYear()
    const formattedMonth = formattedDate.getMonth() + 1
    const formattedDay = formattedDate.getDate()
    const formattedHours = formattedDate.getHours()
    const formattedMinutes = formattedDate.getMinutes()
    const formattedSeconds = formattedDate.getSeconds()

    const formattedDateString = `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    return formattedDateString
  }

  const handleFilterChange = (event) => {
    const { value } = event.target
    setFilterCriteria(value)
    onPageChange(1)
    applyFilters(value, sortColumn, sortDirection)
  }

  const handleSortClick = (column) => {
    let newDirection = columnSortOrder[column] === 'asc' ? 'desc' : 'asc'

    setSortColumn(column)
    setSortDirection(newDirection)
    applyFilters(filterCriteria, column, newDirection)

    // Actualizar el estado de orden de la columna
    setColumnSortOrder({
      ...columnSortOrder,
      [column]: newDirection,
    })
  }

  const applyFilters = (filter, column, direction) => {
    let filteredData = [...allOrders]

    if (filter) {
      filteredData = filteredData.filter((order) => order.state === filter)
    }

    if (column) {
      filteredData.sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]

        if (column === 'data') {
          const dateA = new Date(...aValue)
          const dateB = new Date(...bValue)

          return direction === 'asc' ? dateA - dateB : dateB - dateA
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc'
            ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
            : bValue.localeCompare(aValue, undefined, { sensitivity: 'base' })
        } else {
          return direction === 'asc' ? aValue - bValue : bValue - aValue
        }
      })
    }

    setFilteredOrders(filteredData)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFilters(filterCriteria, sortColumn, sortDirection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCriteria, sortColumn, sortDirection])

  return (
    <>
      <section className='flex m-auto max-w-[1224px] gap-4 bg-[#EAEAF5] z-10'>
        <h1 className='text-3xl font-bold mb-6 text-primary'>Órdenes</h1>
        <div className='max-w-[200px]'>
          <Select
            id='filter'
            value={filterCriteria}
            onChange={handleFilterChange}
            className='mb-4 block rounded-lg ring-yellow-200 focus:ring-yellow-200 border-[1px] border-yellow-200 shadow-sm shadow-yellow-200 focus:border-yellow-200'
            required>
            <option value=''>Filtrar por</option>
            <option className='font-bold' value='DELIVERED'>
              Entregada
            </option>
            <option className='font-bold' value='IN_PROCESS'>
              En proceso
            </option>
            <option className='font-bold' value='CANCELLED'>
              Cancelada
            </option>
          </Select>
        </div>
      </section>
      <section className='overflow-x-auto m-auto max-w-[1224px]'>
        <Table hoverable className='overflow-y-auto'>
          <Table.Head>
            <Table.HeadCell className='transition-all cursor-pointer hover:bg-[#f1f1f1]' onClick={() => handleSortClick('id')}>
              ID {columnSortOrder['id'] && (columnSortOrder['id'] === 'asc' ? '↑' : '↓')}
            </Table.HeadCell>
            <Table.HeadCell className='transition-all cursor-pointer hover:bg-[#f1f1f1]' onClick={() => handleSortClick('state')}>
              Estado {columnSortOrder['state'] && (columnSortOrder['state'] === 'asc' ? '↑' : '↓')}
            </Table.HeadCell>
            <Table.HeadCell className='transition-all cursor-pointer hover:bg-[#f1f1f1]' onClick={() => handleSortClick('total')}>
              Total {columnSortOrder['total'] && (columnSortOrder['total'] === 'asc' ? '↑' : '↓')}
            </Table.HeadCell>
            <Table.HeadCell className='transition-all cursor-pointer hover:bg-[#f1f1f1]' onClick={() => handleSortClick('data')}>
              Fecha {columnSortOrder['data'] && (columnSortOrder['data'] === 'asc' ? '↑' : '↓')}
            </Table.HeadCell>
            <Table.HeadCell className='transition-all hover:bg-[#f1f1f1]'>Detalles</Table.HeadCell>
            <Table.HeadCell className='text-center transition-all hover:bg-[#f1f1f1]'>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {ordersToDisplay.map((order) => (
              <Table.Row key={order.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{order.id}</Table.Cell>
                <Table.Cell
                  className={`${
                    orderStateDisplay[order.state] === 'Entregada'
                      ? 'text-green-500'
                      : orderStateDisplay[order.state] === 'En proceso'
                      ? 'text-yellow-400'
                      : 'text-red-700'
                  }
                  font-bold`}>
                  {orderStateDisplay[order.state]}
                </Table.Cell>
                <Table.Cell>{`$${order.total}`}</Table.Cell>
                <Table.Cell>{formatDate(order.data)}</Table.Cell>
                <Table.Cell>
                  <button className='text-blue-500 hover:underline'>Ver Detalles</button>
                </Table.Cell>
                <Table.Cell className='flex justify-center md:flex-row md:justify-evenly items-center gap-4'>
                  <FontAwesomeIcon className='cursor-pointer h-[20px] text-black' icon={faEdit} />
                  <FontAwesomeIcon className='cursor-pointer h-[20px] text-red-700' icon={faTrash} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
      <div className='w-full flex justify-center p-4'>
        <Pagination
          className=' flex justify-center'
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  )
}

export default OrdersAdmin
