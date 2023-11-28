import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const ProductSearch = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    // Filtrar los productos que coincidan con el término de búsqueda
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(term))

    // Llamar a la función onSearch del componente padre con los productos filtrados
    onSearch(filteredProducts)
  }

  return (
    <nav className='flex justify-center items-center pt-8 pb-8 px-8 lg:px-0 lg:pb-0'>
      <div className='relative w-full md:w-[30%]'>
        <input
          type='text'
          placeholder='Buscar producto...'
          value={searchTerm}
          onChange={handleSearch}
          className='w-full border rounded-md py-2 pl-8 pr-4 transition-all focus:outline-none focus:border-[#F3C623] focus:ring focus:ring-[#F3C623] focus:ring-opacity-50'
        />
        <FontAwesomeIcon icon={faSearch} className='absolute left-2 top-3 text-gray-500' />
      </div>
    </nav>
  )
}

ProductSearch.propTypes = {
  products: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default ProductSearch
