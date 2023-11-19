import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className='space-y-8'>
      <h1 className='text-center text-6xl font-extrabold text-blue-900'>
        MunchEZ<span className='text-orange-300 text-4xl'>.</span>
      </h1>
      <p className='text-center text-2xl font-bold text-blue-900'>Something went wrong</p>
      <p className='text-center text-xl font-bold text-blue-900'>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage
