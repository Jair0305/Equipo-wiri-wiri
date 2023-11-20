import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// components
import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
// pages

import Food, { loader as foodLoader } from './pages/Food'
import Drinks, { loaderdrink as drinksLoader } from './pages/Drinks'
import Desserts, { loaderdesserts as dessertsLoader } from './pages/Desserts'
import Home from './pages/Home'
// styles
import './global.css'

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
        loader: foodLoader,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/drinks',
        element: <Drinks />,
        loader: drinksLoader,
        ErrorBoundary: () => <ErrorPage />,
      },
      {
        path: '/desserts',
        element: <Desserts />,
        loader: dessertsLoader,
        ErrorBoundary: () => <ErrorPage />,
      },
    ],
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
  //   path: '/cocina',
  //   element: <Kitchen />,
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

