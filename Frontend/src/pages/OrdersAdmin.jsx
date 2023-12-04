import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Modal, Pagination, Select, Table } from 'flowbite-react'
import { getAllOrders } from '../api/orders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCancel,
  faCheckCircle,
  faClock,
  faClose,
  faExclamationCircle,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

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
  const [openModal, setOpenModal] = useState(false)
  const [openDetailsCard, setOpenDetailsCard] = useState({})

  const fetchOrders = async () => {
    const data = await getAllOrders()
    setAllOrders(data)
    setFilteredOrders(data) // Inicialmente, muestra todas las órdenes
  }

  const handleDetailsClick = (orderId) => {
    setOpenDetailsCard((prevOpenDetailsCard) => ({
      ...prevOpenDetailsCard,
      [orderId]: !prevOpenDetailsCard[orderId],
    }))
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
  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8080/order/deleteone/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    setOpenModal(false)
    await fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFilters(filterCriteria, sortColumn, sortDirection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCriteria, sortColumn, sortDirection])

  console.log(allOrders)
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
            <option className='font-bold text-green-500' value='DELIVERED'>
              Entregada
            </option>
            <option className='font-bold text-yellow-400' value='IN_PROCESS'>
              En proceso
            </option>
            <option className='font-bold text-red-700' value='CANCELLED'>
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
              <React.Fragment key={order.id}>
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
                    <FontAwesomeIcon
                      icon={
                        orderStateDisplay[order.state] === 'Entregada'
                          ? faCheckCircle
                          : orderStateDisplay[order.state] === 'En proceso'
                          ? faClock
                          : faCancel
                      }
                    />{' '}
                    {orderStateDisplay[order.state]}
                  </Table.Cell>
                  <Table.Cell>{`$${order.total}`}</Table.Cell>
                  <Table.Cell>{formatDate(order.data)}</Table.Cell>

                  <Table.Cell>
                    <button className='text-blue-500 hover:underline' onClick={() => handleDetailsClick(order.id)}>
                      Ver Detalles
                    </button>

                    <div
                      className={`fixed inset-0 z-40 ${openDetailsCard[order.id] ? 'bg-black bg-opacity-50' : 'hidden'}`}></div>
                    {openDetailsCard[order.id] && (
                      <>
                        <Card className='w-full px-4 sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-50'>
                          <section className='flex flex-col lg:flex-row justify-between items-center gap-2'>
                            <h5 className='text-xl tracking-tight text-gray-900 dark:text-white'>
                              Detalles de la orden con ID <span className='font-bold'>{order.id}</span>
                            </h5>
                            <div className='flex gap-4'>
                              <Badge
                                color='info'
                                className={`${
                                  orderStateDisplay[order.state] === 'Entregada'
                                    ? 'text-green-500'
                                    : orderStateDisplay[order.state] === 'En proceso'
                                    ? 'text-yellow-400'
                                    : 'text-red-700'
                                } font-bold`}>
                                <FontAwesomeIcon
                                  icon={
                                    orderStateDisplay[order.state] === 'Entregada'
                                      ? faCheckCircle
                                      : orderStateDisplay[order.state] === 'En proceso'
                                      ? faClock
                                      : faCancel
                                  }
                                />{' '}
                                {orderStateDisplay[order.state]}
                              </Badge>
                              <Badge color={`${order.ordertype === 'TAKEOUT' ? 'failure' : 'warning'}`}>
                                {orderTypeDisplay[order.ordertype]}
                              </Badge>
                            </div>
                          </section>
                          <section className='flex flex-col items-center gap-2 font-normal text-gray-700 dark:text-gray-400'>
                            <div className='flex flex-col items-center gap-2'>
                              <div className='bg-[#F3C623] w-[50px] h-[50px] flex justify-center items-center font-bold text-xl rounded-[50%]'>
                                #{order.num}
                              </div>
                              <p className='text-xl'>
                                de <span className='font-bold'>{order.name}</span>
                              </p>
                            </div>
                          </section>
                          <hr className='bg-black' />
                          <section>
                            <h5 className='flex justify-center text-lg font-bold text-black pb-4'>Productos</h5>
                            {order.orderDetails.map((product) => (
                              <>
                                <div key={product.id} className='flex justify-between'>
                                  <p className='font-bold'>{product.productName}</p>
                                  <div className='flex gap-8 items-center'>
                                    <p className='text-base font-bold'>x{product.det_amount}</p>
                                    <p className='text-base font-bold text-black mr-2'>${product.price}</p>
                                  </div>
                                </div>
                                <hr className='mb-2' />
                              </>
                            ))}
                            <div className='flex justify-end'>
                              <Badge color='dark' className='flex gap-2 text-lg text-white font-normal'>
                                Total: <span className=''>${order.total}</span>
                              </Badge>
                            </div>
                          </section>
                          <Button color='dark' onClick={() => handleDetailsClick(order.id)}>
                            Cerrar
                          </Button>
                        </Card>
                      </>
                    )}
                  </Table.Cell>

                  <Table.Cell className='flex justify-center md:flex-row md:justify-evenly items-center gap-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer h-[20px] focus:ring-[#F3C623] focus:border-[1px] focus:border-[#F3C623] text-red-700'
                      icon={faTrash}
                      onClick={setOpenModal}
                    />
                    <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
                      <Modal.Header />
                      <Modal.Body>
                        <div className='text-center'>
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            className='mx-auto mb-4 h-14 w-14 text-[#F3C623] dark:text-gray-200'
                          />
                          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                            ¿Está segur@ que desea eliminar esta orden?
                          </h3>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => handleDelete(order.id)}>
                              {'Si, estoy segur@'}
                            </Button>
                            <Button color='gray' onClick={() => setOpenModal(false)}>
                              No, cancelar.
                            </Button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
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
