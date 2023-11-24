import PropTypes from 'prop-types'

const Order = ({ order }) => {
  const { id, description, name, num } = order
  return (
    <div key={id}>
      <h1>Orden de {name}</h1>
      <p>{description}</p>
    </div>
  )
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
}

export default Order
