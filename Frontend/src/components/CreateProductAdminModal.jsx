import PropTypes from 'prop-types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { Flowbite } from 'flowbite-react'
import { postProductApi } from '../api/products'

const CreateProductAdminModal = ({ fetchProducts, notifyErrorDeletingProduct }) => {
  const [openModal, setOpenModal] = useState(false)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const [error, setError] = useState(null)

  const customTheme = {
    button: {
      color: {
        primary: 'transition-all bg-[#F3C623] active:bg-[#F3C623] hover:bg-[#ddb00f] text-[#424242] hover:text-[#000] ',
      },
    },
  }
  const clearErrors = () => {
    setError(null)
  }
  const clearForm = () => {
    setName('')
    setPrice('')
    setCategory('')
    setDescription('')
  }
  const closeModal = () => {
    setOpenModal(false)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validate data before sending info
    const product = {
      name,
      price,
      description,
      type: category,
    }
    if (name === '' || price === '' || category === '' || description === '') {
      setError('Todos los campos son obligatorios.')
      return
    }

    // send data to backend when all fields are filled
    try {
      const productCreated = await postProductApi(product)
      if (!productCreated) {
        setError('Error al crear el producto.')
      }
      notifyErrorDeletingProduct('success', 'Producto creado con éxito.')
    } catch (error) {
      console.error('Error al crear el producto:', error)
    }
    // fetch products again
    fetchProducts()
    // clear UI
    clearErrors()
    clearForm()
    setOpenModal(false)
  }

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Button color='primary' className='flex gap-4' size='xl' onClick={() => setOpenModal(true)}>
          <FontAwesomeIcon icon={faPlus} className='h-[20px] mr-2' />
          Agregar Producto
        </Button>

        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className='font-bold'>Crear Nuevo Producto</Modal.Header>
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <label htmlFor='category' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                    Categoría
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    id='category'
                    value={category}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'>
                    <option value=''>Seleccione una categoría</option>
                    <option className='text-lg' value='FOOD'>
                      Comida
                    </option>
                    <option className='text-lg' value='DRINKS'>
                      Bebidas
                    </option>
                    <option className='text-lg' value='DESSERTS'>
                      Postres
                    </option>
                  </select>
                </div>
                <div className='col-span-2'>
                  <label htmlFor='description' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                    Descripción
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    id='description'
                    rows={4}
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Descripción del producto'
                    value={description}
                  />
                </div>
              </div>
              <section className='flex justify-center items-center gap-4'>
                <Button color='primary' type='submit'>
                  <svg className='me-1 -ms-1 w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Crear producto
                </Button>
                <Button color='gray' onClick={closeModal} className='hover:bg-black'>
                  Cancelar
                </Button>
              </section>
            </form>
          </Modal.Body>
        </Modal>
      </Flowbite>
    </>
  )
}

CreateProductAdminModal.propTypes = {
  fetchProducts: PropTypes.func,
}

export default CreateProductAdminModal
