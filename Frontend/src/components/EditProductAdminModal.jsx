import PropTypes from 'prop-types'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'

const EditProductAdminModal = ({ fetchProducts, product }) => {
  const { id, name, price, type, description, active } = product

  const [openModal, setOpenModal] = useState(false)
  const [newName, setNewName] = useState(name)
  const [newPrice, setNewPrice] = useState(price)
  const [newCategory, setNewCategory] = useState(type)
  const [newDescription, setNewDescription] = useState(description)
  const [error, setError] = useState(null)

  const clearErrors = () => {
    setError(null)
  }

  const clearForm = () => {
    setNewName(name)
    setNewPrice(price)
    setNewCategory(type)
    setNewDescription(description)
  }

  useEffect(() => {
    // restore form data when product changes
    setNewName(name)
    setNewPrice(price)
    setNewCategory(type)
    setNewDescription(description)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const closeModal = () => {
    setOpenModal(false)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // validate data before sending info
    if (newName === '' || newPrice === '' || newDescription === '' || newCategory === '') {
      setError('Todos los campos son obligatorios.')
      return
    }

    const newProduct = {
      name: newName,
      price: newPrice,
      description: newDescription,
      type: newCategory,
    }

    // send data to backend
    console.log(newProduct)

    const response = await fetch(`http://localhost:8080/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

    console.log('response', response)

    // fetch products again
    await fetchProducts()

    // clear UI
    clearErrors()
    clearForm()
    setOpenModal(false)
  }

  return (
    <>
      <Button className=' flex focus:ring-[#F3C623]' color='transparent' size='xs' onClick={() => setOpenModal(true)}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className='transition-colors h-[30px] lg:h-[25px] text-black hover:text-[#3b3b3b]'
        />
      </Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='flex justify-start items-center gap-2'>
          <p className='flex justify-start items-center gap-2'>
            Editando{' '}
            <Badge size='sm' color={active ? 'success' : 'failure'}>
              {active ? 'Activo' : 'Inactivo'}
            </Badge>
            <span className='text-sm font-bold'>{name}</span>
          </p>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className='m-4 p-4 bg-red-700'>
              <h1 className='text-white'>{error}</h1>
            </div>
          )}
          <form className='p-4 md:p-5' onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              <div className='col-span-2'>
                <label htmlFor='name' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Nombre
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Nombre del producto'
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='price' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Precio al publico
                </label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='$50'
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='category' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Categoria
                </label>
                <select
                  onChange={(e) => setNewCategory(e.target.value)}
                  id='category'
                  value={newCategory}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'>
                  <option value=''>-- Select category --</option>
                  <option value='FOOD'>Comida</option>
                  <option value='DRINKS'>Bebidas</option>
                  <option value='DESSERTS'>Postres</option>
                </select>
              </div>
              <div className='col-span-2'>
                <label htmlFor='description' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Descripción
                </label>
                <textarea
                  onChange={(e) => setNewDescription(e.target.value)}
                  id='description'
                  rows={4}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Descripcion del producto'
                  value={newDescription}
                />
              </div>
            </div>
            <section className='flex justify-center items-center gap-4'>
              <Button color='dark' type='submit'>
                Confirmar cambios
              </Button>
              <Button color='gray' onClick={closeModal} className='hover:bg-black'>
                Cancelar
              </Button>
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
EditProductAdminModal.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

export default EditProductAdminModal
