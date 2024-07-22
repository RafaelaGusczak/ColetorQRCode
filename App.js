import AuthProvider from './src/contexts/auth'
import ContatoProvider from './src/contexts/contatos'
import Rotas from './src/routes'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        <ContatoProvider>
          <Rotas />
        </ContatoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


