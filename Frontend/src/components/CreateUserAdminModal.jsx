import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Flowbite, Modal } from 'flowbite-react'
import { useState } from 'react'
import { postUser } from '../api/personal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateUserAdminModal = () => {
  const [openModal, setOpenModal] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [errors, setErrors] = useState({})

  const notify = () =>
    toast.success('Usuario Creado Correctamente!', {
      position: 'bottom-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const customTheme = {
    button: {
      color: {
        primary: 'transition-all bg-[#F3C623] active:bg-[#F3C623] hover:bg-[#ddb00f] text-[#424242] hover:text-[#000] ',
      },
    },
  }

  const clearErrors = () => {
    setErrors({})
  }

  const clearForm = () => {
    setUsername('')
    setPassword('')
    setErrors({})
  }

  const closeModal = () => {
    setOpenModal(false)
    clearErrors()
    clearForm()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()

    if (!username) {
      setErrors((prev) => ({ ...prev, username: 'El campo de nombre de usuario es requerido.' }))
      return
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'El campo de contraseña es requerido.' }))
      return
    }

    if (!role) {
      setErrors((prev) => ({ ...prev, role: 'El campo de rol es requerido.' }))
      return
    }

    // send data to backend
    const userCreated = await postUser({ username, password, role })

    if (userCreated) {
      // La solicitud POST se completó con éxito, ahora se puede actualizar la lista de empleados
      notify()
      closeModal()
    } else {
      console.error('Error creating user:', userCreated.statusText)
    }
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <ToastContainer />
      <Button color='primary' className='flex gap-4' size='md' onClick={() => setOpenModal(true)}>
        <FontAwesomeIcon icon={faUserShield} className='h-[20px] mr-2 text-black' />
        Agregar Usuario
      </Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='font-bold'>Agregar Nuevo Usuario</Modal.Header>
        <Modal.Body>
          {errors.allFields && (
            <div className='m-4 p-4 bg-red-700'>
              <h1 className='text-white'>{errors.allFields}</h1>
            </div>
          )}
          <form className='p-4 md:p-5' onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 grid-cols-2'>
              <div className='col-span-2'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-bold placeholder:text-gray-400 text-gray-900 dark:text-white'>
                  Nombre de Usuario
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Usuario123'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>

              {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username}</p>}
              <div className='col-span-2'>
                <label htmlFor='phone' className='block mb-2 text-sm font-bold text-gray-900  dark:text-white'>
                  Contraseña
                </label>
                <div className='flex items-center gap-1'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='**********'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
                <div className='col-span-2 sm:col-span-1'>
                  <label htmlFor='category' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>
                    Rol
                  </label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    id='role'
                    value={role}
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
                {errors.role && <p className='text-red-500 text-xs mt-1'>{errors.role}</p>}
              </div>
            </div>
            <hr className='my-4' />
            <section className='flex justify-center items-center gap-4'>
              <Button color='primary' className='flex gap-4' type='submit'>
                <svg className='me-1 -ms-1 w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                Agregar Usuario
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

export default CreateUserAdminModal
