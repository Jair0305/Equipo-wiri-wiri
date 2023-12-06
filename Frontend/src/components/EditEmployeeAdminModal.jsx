import PropTypes from 'prop-types'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, Flowbite, Modal } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { putEmployee } from '../api/personal'

const EditEmployeeAdminModal = ({ employee, fetchEmployees }) => {
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

    // Mapear el rol a un número antes de enviar al backend
    let roleId = 0

    switch (rol) {
      case 'KITCHEN':
        roleId = 1
        break
      case 'ADMIN':
        roleId = 2
        break
      case 'CASHIER':
        roleId = 3
        break
      default:
        break
    }

    // Enviar datos al backend para actualizar
    const updatedEmployee = {
      id: employee.id,
      name,
      roleId,
      phone,
      active: true,
    }

    const response = await putEmployee(employee.id, updatedEmployee)

    if (!response) {
      console.error('Error updating employee:', response.statusText)
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

  useEffect(() => {
    // Cargar datos del empleado al abrir el modal
    if (openModal) {
      setName(employee.name || '')
      setPhone(employee.phone || '')
      setRol(employee.role || '') // Asegúrate de establecer correctamente el estado de 'rol'
    }
  }, [employee, openModal])

  return (
    <Flowbite>
      <FontAwesomeIcon className='cursor-pointer h-[20px] text-black' icon={faEdit} onClick={() => setOpenModal(true)} />

      <Modal dismissible show={openModal} onClose={closeModal}>
        <Modal.Header className='font-bold'>
          Editando Empleado <span className='text-sm font-bold'>{employee.name}</span>
        </Modal.Header>
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
                  <option className='text-lg' value='KITCHEN'>
                    Cocinero
                  </option>
                  <option className='text-lg' value='CASHIER'>
                    Cajero
                  </option>
                  <option className='text-lg' value='ADMIN'>
                    Administrador
                  </option>
                </select>
              </div>
            </div>
            <hr className='my-4' />
            <section className='flex justify-center items-center gap-4'>
              <Button color='dark' type='submit'>
                Confirmar Cambios
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

EditEmployeeAdminModal.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
}

export default EditEmployeeAdminModal
