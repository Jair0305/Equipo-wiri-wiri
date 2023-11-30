// styles

import './global.css'
import AppRouter from './router/AppRouter'
import { AuthProvider } from './Helpers/useAuth'

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
