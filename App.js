import AuthProvider from './src/contexts/auth'
import Rotas from './src/routes'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App


