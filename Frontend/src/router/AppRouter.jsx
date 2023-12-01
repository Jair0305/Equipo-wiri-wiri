import { useLocation, Navigate, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
// components
import Layout from '../components/Layout'
import LayoutKitchen from '../components/LayoutKitchen'
import AdminLayout from '../components/AdminLayout'
// pages
import Login from '../pages/Login'
import Drinks from '../pages/Drinks'
import Food from '../pages/Food'
import Desserts from '../pages/Desserts'
import Home from '../pages/Home'
import Orders from '../pages/Orders'
import AdminDashboard from '../pages/AdminDashboard'
import EmployeesAdmin from '../pages/Employees'
import ProductsAdmin from '../pages/ProductsAdmin'
import OrdersAdmin from '../pages/OrdersAdmin'
import { useAuth } from '../Helpers/useAuth'
import AdminModal from '../components/CreateProductAdminModal'

const PrivateRoute = ({ element, roles }) => {
  const { isLoggedIn, role } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  if (roles && roles.length > 0 && !roles.includes(role)) {
    // El usuario tiene el rol, pero no tiene permisos para acceder a la ruta.
    // Redirigirlo a una ruta a la que tiene acceso según su rol.
    switch (role) {
      case 'CASHIER':
        return <Navigate to='/cashier/food' />
      case 'KITCHEN':
        return <Navigate to='/kitchen' />
      case 'ADMIN':
        return <Navigate to='/admin/dashboard' />
      default:
        // Redirigir a una ruta predeterminada si el rol no coincide con los casos anteriores.
        return <Navigate to='/' />
    }
  }

  return element
}

const AppRouter = () => {
  return (
    <Routes>
      <Route index path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cashier' element={<PrivateRoute element={<Layout />} roles={['CASHIER']} />}>
        <Route index path='food' element={<Food />} />
        <Route path='drinks' element={<Drinks />} />
        <Route path='desserts' element={<Desserts />} />
      </Route>
      <Route path='/kitchen' element={<PrivateRoute element={<LayoutKitchen />} roles={['KITCHEN']} />}>
        <Route path='' element={<Orders />} />
      </Route>
      <Route path='/admin' element={<PrivateRoute element={<AdminLayout />} roles={['ADMIN']} />}>
        <Route index path='dashboard' element={<AdminDashboard />} />
        <Route path='dashboard/employees' element={<EmployeesAdmin />} />
        <Route path='dashboard/products' element={<ProductsAdmin />} />
        <Route path='dashboard/orders' element={<OrdersAdmin />} />
      </Route>
      <Route path='*' element={<AdminModal />} />
    </Routes>
  )
}

export default AppRouter

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
}
