import PropTypes from 'prop-types'

const SvgUserMenu = ({ isMenuOpen }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`h-6 w-6 ${isMenuOpen ? 'transform rotate-180' : ''}`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='#ffffff'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
    </svg>
  )
}

SvgUserMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
}

export default SvgUserMenu
