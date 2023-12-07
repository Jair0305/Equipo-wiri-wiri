import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteEmployee } from '../api/personal'

const DeleteEmployeeAdminModal = ({ fetchEmployees, employee }) => {
  const [employeeToDelete, setEmployeeToDelete] = useState(false)

  const handleDelete = async (id) => {
    try {
      const deletedEmployee = await deleteEmployee(id)
      if (deletedEmployee) {
        // La solicitud DELETE se completó con éxito, ahora se puede actualizar la lista de empleados
        setEmployeeToDelete(null)
        await fetchEmployees()
      } else {
        console.error('Error deleting employee:', deleteEmployee.statusText)
      }
    } catch (error) {
      console.error('Error while trying to make a DELETE petition: ', error)
    }
  }

  return (
    <>
      <FontAwesomeIcon
        className='cursor-pointer h-[20px] focus:ring-[#F3C623] focus:border-[1px] focus:border-[#F3C623] text-red-700'
        icon={faTrash}
        onClick={() => setEmployeeToDelete(employee.id)}
      />
      <Modal show={employeeToDelete === employee.id} size='md' onClose={() => setEmployeeToDelete(null)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <FontAwesomeIcon icon={faExclamationCircle} className='mx-auto mb-4 h-14 w-14 text-[#F3C623] dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              ¿Está segur@ que desea eliminar este empleado?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleDelete(employee.id)}>
                {'Si, estoy segur@'}
              </Button>
              <Button color='gray' onClick={() => setEmployeeToDelete(null)}>
                No, cancelar.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

DeleteEmployeeAdminModal.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
}

export default DeleteEmployeeAdminModal
