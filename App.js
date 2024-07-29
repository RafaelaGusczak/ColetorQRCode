import AuthProvider from './src/contexts/auth'
import ContatoProvider from './src/contexts/contatos'
import Rotas from './src/routes'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        <ContatoProvider>
          <ToastContainer autoClose={5000} />
          <Rotas />
        </ContatoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


