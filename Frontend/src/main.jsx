import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// components
import Layout from './components/Layout'
import LayoutKitchen from './components/LayoutKitchen'
import AdminLayout from './components/AdminLayout'
import ErrorPage from './components/ErrorPage'
// pages
import Login from './pages/Login'
import Drinks from './pages/Drinks'
import Food from './pages/Food'
import Desserts from './pages/Desserts'
import Home from './pages/Home'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'
import EmployeesAdmin from './pages/Employees'
import ProductsAdmin from './pages/ProductsAdmin'
import OrdersAdmin from './pages/OrdersAdmin'
// styles
import './global.css'
// api
import { getOrders } from './api/orders'

export const fetchOrders = async () => {
  try {
    const ordersFetched = await getOrders()
    return ordersFetched
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

const router = createBrowserRouter([
  // ----------LOGIN-------------
  {
    path: '/login',
    element: <Login />,
    ErrorBoundary: () => <ErrorPage />,
  },
  // ----------CASHIER-------------
  {
    path: '/cashier',
    element: <Layout />,
    children: [
      {
        path: '/cashier',
        index: true,
        element: <Home />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/cashier/food',
        element: <Food />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/cashier/drinks',
        element: <Drinks />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/cashier/desserts',
        element: <Desserts />,
        ErrorBoundary: () => <ErrorPage />,
      },
    ],
  },
  // ----------KITCHEN-------------
  {
    path: '/kitchen',
    element: <LayoutKitchen />,
    children: [
      {
        path: '/kitchen',
        element: <Orders />,
        ErrorBoundary: () => <ErrorPage />,
      },
    ],
  },
  // ----------ADMIN-------------
  {
    path: '/admin/dashboard',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        path: '/admin/dashboard',
        element: <AdminDashboard />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/admin/dashboard/employees',
        element: <EmployeesAdmin />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/admin/dashboard/products',
        element: <ProductsAdmin />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/admin/dashboard/orders',
        element: <OrdersAdmin />,
        ErrorBoundary: () => <ErrorPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage text='404 - Not Found' />,
    ErrorBoundary: () => <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
