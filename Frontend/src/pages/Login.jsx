import { useState } from 'react'
import munchEZLogo from '../assets/logos/MuncEZ-dark.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Helpers/useAuth'

const Login = () => {
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isUsernameFocused, setIsUsernameFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const { isLoggedIn, role, login } = useAuth()

  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameFocus = () => {
    setIsUsernameFocused(true)
  }

  const handleUsernameBlur = () => {
    setIsUsernameFocused(false)
  }

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true)
  }

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false)
  }

  const clearErrors = () => {
    setErrors([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { username, password } }),
      })

      if (!response.ok) {
        throw new Error('Error en la autenticación')
      }
      clearErrors()
      const data = await response.json()

      if (data.jwt && data.user?.authorities?.length > 0) {
        const userRole = data.user.authorities[0].authority

        // Guardar el token y el rol en el localStorage
        login(data.jwt, userRole)

        // Redirigir según el rol
        switch (userRole) {
          case 'ADMIN':
            navigate('/admin/dashboard')
            break
          case 'CASHIER':
            navigate('/cashier')
            break
          case 'KITCHEN':
            navigate('/kitchen')
            break
          default:
            // Redirigir a una página predeterminada en caso de un rol desconocido
            navigate('/login')
        }
      } else {
        alert('Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error en la autenticación:', error)
      setErrors((prevErrors) => [...prevErrors, 'Error en la autenticación. Por favor, intenta de nuevo.'])
    }
  }

  return (
    <div className='h-screen bg-[#EAEAF5] overflow-hidden'>
      <header className='bg-[#2D2D2D] flex justify-center items-center'>
        <img src={munchEZLogo} alt='MunchEZ Logo' className='w-[130px] sm:w-[160px] p-4' />
        <h1 className='text-xl sm:text-3xl text-white font-bold'>MunchEZ</h1>
      </header>
      <main className='flex justify-center items-center h-[calc(100vh-150px)]'>
        <div className='w-auto sm:w-[450px] md:w-[550px] bg-white shadow-lg flex flex-col justify-center items-center p-8 gap-8 border-[2px] border-[#ABA7A7]'>
          <h1 className='text-3xl text-[#2D2D2D] font-bold'>Iniciar Sesión</h1>
          {errors.length > 0 && <div className='w-[260px] sm:w-[350px] bg-red-500 text-white p-4 rounded-md'>{errors[0]}</div>}
          <form className='flex flex-col justify-center items-center gap-12 lg:gap-16' onSubmit={handleSubmit}>
            <div className='relative'>
              <label
                htmlFor='username'
                className={`absolute transition-all pointer-events-none ${
                  isUsernameFocused || username ? 'text-[#F3C623] -top-8 text-lg' : 'text-[#ABA7A7] top-4 text-base ml-4'
                }`}>
                Usuario
              </label>
              <input
                type='text'
                id='username'
                placeholder=''
                className='w-full sm:w-[350px] h-[56px] rounded-md border-2 border-[#ABA7A7] focus:border-[#F3C623] px-6 focus:outline-none transition-transform'
                value={username}
                onChange={handleUsernameChange}
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
              />
            </div>
            <div className='relative'>
              <label
                htmlFor='password'
                className={`absolute transition-all pointer-events-none ${
                  isPasswordFocused || password ? 'text-[#F3C623] -top-8 text-lg' : 'text-[#ABA7A7] top-4 text-base ml-4'
                }`}>
                Contraseña
              </label>
              <input
                type='password'
                id='password'
                placeholder=''
                className='w-full sm:w-[350px] h-[56px] rounded-md border-2 border-[#ABA7A7] focus:border-[#F3C623] px-6 focus:outline-none transition-transform'
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
            </div>
            <button type='submit' className='w-full sm:w-[350px] h-[56px] rounded-md bg-[#F3C623] text-white font-bold'>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
