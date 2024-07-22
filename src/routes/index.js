import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Private from './private'
import Contatos from '../pages/Contatos'
import Empresa from '../pages/Empresa'


export default function Rotas() {


    return (
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route
                path='/home'
                element={
                    <Private>
                        <Home />
                    </Private>
                } />
             <Route
                path='/contatos'
                element={
                    <Private>
                        <Contatos />
                    </Private>
                } />
                <Route
                path='/empresa'
                element={
                    <Private>
                        <Empresa />
                    </Private>
                } />
        </Routes>
    )
}