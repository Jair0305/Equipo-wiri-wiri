import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Snowfall.css' // Asegúrate de ajustar la ruta correcta
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'

const Snowfall = () => {
  const createSnowflakes = () => {
    const snowflakes = []

    for (let i = 0; i < 40; i++) {
      // Genera posiciones y tamaños aleatorios
      const minSize = 10
      const maxSize = 15

      const size = Math.random() * (maxSize - minSize) + minSize
      const style = {
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${Math.random() * 2 + 4}s`, // Duración entre 4s y 6s
        animationDelay: `${Math.random()}s`,
      }

      snowflakes.push(<FontAwesomeIcon key={i} icon={faSnowflake} className='snowflake text-white' style={style} />)
    }

    return snowflakes
  }

  return <div className='snowfall'>{createSnowflakes()}</div>
}

export default Snowfall
