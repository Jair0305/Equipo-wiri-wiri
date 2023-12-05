import munchEZLogo from '../assets/logos/MunchEZ-white.svg'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  const redirectToPrevious = () => {
    navigate(-1) // -1 indica retroceder en la historia
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-center items-center gap-4 mt-20'>
        <img className='w-[100px]' src={munchEZLogo} alt='logo MunchEZ' />
        <h1 className='text-2xl text-center '>Error 404 - Página no encontrada</h1>
      </div>
      <button className='text-lg text-[#F3C623] underline' onClick={redirectToPrevious}>
        Ir a la ruta anterior
      </button>
    </div>
  )
}

export default ErrorPage
