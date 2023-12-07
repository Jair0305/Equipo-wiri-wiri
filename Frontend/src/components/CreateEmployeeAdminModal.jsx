import PropTypes from 'prop-types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, Flowbite, Modal } from 'flowbite-react'
import { useState } from 'react'
import { postEmployee } from '../api/personal'

const CreateEmployeeAdminModal = ({ fetchEmployees }) => {
  const [openModal, setOpenModal] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [rol, setRol] = useState('')

  const [errors, setErrors] = useState({})

  const clearErrors = () => {
    setErrors({})
  }

  const clearForm = () => {
    setName('')
    setPhone('')
    setRol('')
    setErrors({})
  }

  const closeModal = () => {
    setOpenModal(false)
    clearErrors()
    clearForm()
  }

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value

    // Validar que el formato sea un número positivo con hasta 10 dígitos
    const isValidInput = /^\d{0,10}$/.test(inputValue)

    if (!isValidInput) {
      setErrors({ ...errors, phone: 'El teléfono debe ser un número de hasta 10 dígitos.' })
    } else {
      setErrors({ ...errors, phone: null })
      setPhone(inputValue)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar campos obligatorios
    if (!name || !phone || !rol) {
      setErrors({ ...errors, allFields: 'Todos los campos son obligatorios.' })
      return
    } else {
      setErrors({ ...errors, allFields: null })
    }

    // Validar la longitud del teléfono nuevamente antes de enviar
    if (phone.length !== 10) {
      setErrors({ ...errors, phone: 'El teléfono debe ser un número de 10 dígitos.' })
      return
    } else {
      setErrors({ ...errors, phone: null })
    }

    // Enviar datos al backend
    const employee = {
      name,
      roleId: Number(rol),
      phone,
      active: true,
    }

    const response = await postEmployee(employee)

    if (!response) {
      console.error('Error creating employee:', response.statusText)
      return
    }
    // Actualizar lista de empleados
    fetchEmployees()

    // Limpiar errores y formulario
    clearErrors()
    clearForm()

    // Cerrar el modal
    setOpenModal(false)
  }

  return (
    <Flowbite>
      <Button color='success' className='flex gap-4' size='md' onClick={() => setOpenModal(true)}>
        <FontAwesomeIcon icon={faPlus} className='h-[20px] mr-2' />
        Agregar Empleado
      </Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='font-bold'>Agregar Nuevo Empleado</Modal.Header>
        <Modal.Body>
          {errors.allFields && (
            <div className='m-4 p-4 bg-red-700'>
              <h1 className='text-white'>{errors.allFields}</h1>
            </div>
          )}
          <form className='p-4 md:p-5' onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              <div className='col-span-2'>
                <label htmlFor='name' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Nombre Completo
                </label>
                <input
                  type='text'
                  name='fullname'
                  id='fullname'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Nombre del Empleado'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='phone' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Telefono
                </label>
                <div className='flex items-center gap-1'>
                  <Badge color='success'>+52</Badge>
                  <input
                    type='tel'
                    name='phone'
                    id='phone'
                    maxLength='10'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='1234567890'
                    onChange={handlePhoneChange}
                    value={phone}
                  />
                </div>
                {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
              </div>

              <div className='col-span-2 sm:col-span-1'>
                <label htmlFor='category' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                  Rol
                </label>
                <select
                  onChange={(e) => setRol(e.target.value)}
                  id='rol'
                  value={rol}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'>
                  <option value=''>Seleccione un Rol</option>
                  <option className='text-lg' value='1'>
                    Cocinero
                  </option>
                  <option className='text-lg' value='3'>
                    Cajero
                  </option>
                  <option className='text-lg' value='2'>
                    Administrador
                  </option>
                </select>
              </div>
            </div>
            <hr className='my-4' />
            <section className='flex justify-center items-center gap-4'>
              <Button color='success' type='submit'>
                <svg className='me-1 -ms-1 w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                Agregar Empleado
              </Button>
              <Button color='gray' onClick={closeModal} className='hover:bg-black'>
                Cancelar
              </Button>
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </Flowbite>
  )
}

CreateEmployeeAdminModal.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
}

export default CreateEmployeeAdminModal
