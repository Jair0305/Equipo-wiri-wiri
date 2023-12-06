import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import EditProductAdminModal from './EditProductAdminModal'
import foodImg from '../assets/images/food.jpg'
import drinkImg from '../assets/images/drink.jpg'
import dessertImg from '../assets/images/dessert.jpg'

const ProductAdminCard = ({ product, handleDisable, fetchProducts }) => {
  const { id, name, description, type, active } = product

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-7 md:gap-2 p-4 justify-center items-center shadow-xl rounded-lg bg-[#F7F6FF] mb-8 hover:scale-[1.01] transition-all'>
      <img
        src={type === 'FOOD' ? foodImg : type === 'DRINKS' ? drinkImg : dessertImg}
        alt={name}
        className=' md:col-span-3 xl:col-span-2 h-auto object-cover mb-4 lg:pr-1 lg:mb-0 rounded-lg'
      />
      <div className='md:col-span-4 xl:col-span-4 flex flex-col justify-center items-start'>
        <h2 className='text-xl lg:text-xl font-bold'>{name}</h2>
        <p className='text-base lg:text-sm text-justify mb-4 md:pr-2'>{description}</p>
      </div>
      <section className='md:col-span-1 flex md:flex-col justify-evenly items-center gap-4 h-[100px] lg:h-full md:pr-4 md:pl-6 border-t-[1px] md:border-l-[1px] md:border-t-0 border-[#e0e0e0]'>
        <div className='text-sm lg:text-base font-bold'>
          <EditProductAdminModal fetchProducts={fetchProducts} product={product} />
        </div>
        <div className='text-sm lg:text-base font-bold'>
          <button>
            <FontAwesomeIcon
              icon={active ? faToggleOn : faToggleOff}
              className={`transition-colors h-[30px] lg:h-[25px] ${
                active ? 'text-green-600 hover:text-green-500' : 'text-red-700 hover:text-red-600'
              }`}
              onClick={() => handleDisable(id, product)}
            />
          </button>
        </div>
        <div className='text-sm lg:text-base font-bold'>
          <button>
            <FontAwesomeIcon
              icon={faTrashCan}
              className='transition-colors h-[30px] lg:h-[25px] text-red-700 hover:text-red-600'
            />
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductAdminCard
