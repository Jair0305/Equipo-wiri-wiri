import { useEffect, useState } from 'react'
import { Pagination, Table } from 'flowbite-react'
import { getActiveEmployees } from '../api/personal'

import CreateEmployeeAdminModal from '../components/CreateEmployeeAdminModal'
import DeleteEmployeeAdminModal from '../components/DeleteEmployeeAdminModal'
import EditEmployeeAdminModal from '../components/EditEmployeeAdminModal'

const EmployeesAdmin = () => {
  const [allEmployees, setAllEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const fetchEmployees = async () => {
    const employees = await getActiveEmployees()
    console.log(employees)
    setAllEmployees(employees)
    setFilteredEmployees(employees)
  }

  const employeeRolToDisplay = {
    KITCHEN: 'Cocinero',
    ADMIN: 'Administrador',
    CASHIER: 'Cajero',
  }

  const employeesPerPage = 10

  const calculateTotalPages = () => Math.ceil(filteredEmployees.length / employeesPerPage)
  const totalPages = calculateTotalPages()
  const onPageChange = (page) => setCurrentPage(page)
  const startIndex = (currentPage - 1) * employeesPerPage
  const endIndex = startIndex + employeesPerPage
  const employeesToDisplay = filteredEmployees.slice(startIndex, endIndex)

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <>
      <section className='flex flex-col-reverse md:flex-row justify-between items-center m-auto max-w-[1224px] gap-4 py-4 bg-[#EAEAF5] z-10'>
        <h1 className='text-3xl font-bold text-primary'>Empleados</h1>
        <CreateEmployeeAdminModal fetchEmployees={fetchEmployees} />
      </section>

      <section className='overflow-x-auto m-auto max-w-[1224px]'>
        {employeesToDisplay.length === 0 ? (
          <div className='flex justify-center items-center h-[300px]'>
            <h1 className='text-2xl font-bold text-gray-500'>No hay empleados que mostrar</h1>
          </div>
        ) : (
          <Table hoverable className='overflow-y-auto'>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Rol</Table.HeadCell>
              <Table.HeadCell>Telefono</Table.HeadCell>
              <Table.HeadCell className='flex justify-center'>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {employeesToDisplay.map((employee) => (
                <Table.Row key={employee.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{employee.id}</Table.Cell>
                  <Table.Cell>{employee.name}</Table.Cell>
                  <Table.Cell>{employeeRolToDisplay[employee.role]}</Table.Cell>
                  <Table.Cell>{employee.phone}</Table.Cell>
                  <Table.Cell className='flex justify-evenly items-center'>
                    <EditEmployeeAdminModal fetchEmployees={fetchEmployees} employee={employee} />
                    <DeleteEmployeeAdminModal fetchEmployees={fetchEmployees} employee={employee} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </section>
      {employeesToDisplay.length > 0 && (
        <div className='w-full flex justify-center p-4'>
          <Pagination
            className=' flex justify-center'
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}
    </>
  )
}

export default EmployeesAdmin
