import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// components
import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
// pages
import Drinks from './pages/Drinks'
import Food from './pages/Food'
import Desserts from './pages/Desserts'
import Home from './pages/Home'
// styles
import './global.css'
import Orders from './pages/Orders'
import LayoutKitchen from './components/LayoutKitchen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/food',
        element: <Food />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/drinks',
        element: <Drinks />,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/desserts',
        element: <Desserts />,
        ErrorBoundary: () => <ErrorPage />,
      },
    ],
  },
  {
    path: '/',
    element: <LayoutKitchen />,
    children: [
      {
        path: '/orders',
        element: <Orders />,
        ErrorBoundary: () => <ErrorPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage text='404 - Not Found' />,
    ErrorBoundary: () => <ErrorPage />,
  },
  // {
  //   path: '/admin',
  //   element: <Admin />,
  //   children: [
  //     {
  //       path: '/',
  //       element: <AdminDashboard />,
  //     },
  //     {
  //       path: '/users',
  //       element: <AdminUsers />,
  //     },
  //   ],
  // },
  // {
  //   path: '/kitchen',
  //   element: <Kitchen />,
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
