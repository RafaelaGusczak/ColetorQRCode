import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Private from './private'


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
        </Routes>
    )
}