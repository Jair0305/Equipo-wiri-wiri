import munchEZLogo from '../../public/logos/MuncEZ-dark.svg'

const Header = () => {
  return (
    <header className='w-full bg-[#2D2D2D] flex justify-between items-center'>
      <div className='flex items-center w-[2/3]'>
        <img src={munchEZLogo} alt='MunchEZ logo' className='w-[100px] sm:w-[130px] p-4' />
        <h1 className='text-xl sm:text-3xl text-white font-bold'>MunchEZ</h1>
      </div>
      <div className='py-4 px-8 w-[1/3]'>
        <button className='bg-[#F3C623] text-[#2D2D2D] py-2 px-4 rounded-lg font-bold text-sm sm:text-base uppercase'>
          Login
        </button>
      </div>
    </header>
  )
}

export default Header
