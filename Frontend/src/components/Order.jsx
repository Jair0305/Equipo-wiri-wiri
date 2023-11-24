import PropTypes from 'prop-types'

const Order = ({ order }) => {
  console.log(order)
  const { id, description, name, num, orderDetails, ordertype } = order

  const getOrderType = {
    TAKEOUT: 'Para llevar',
    FOR_HERE: 'Para comer aquí',
  }
  console.log('Order Type:', ordertype)

  return (
    <div key={id} className='flex justify-center items-center'>
      <h1>Orden {num}</h1>
      <p>Orden de {name}</p>
      <p>{description}</p>
      {/* {orderDetails.map((product) => (
        <h1>s</h1>
      )} */}
      <p>{getOrderType[ordertype]}</p>
    </div>
  )
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
}

export default Order
