import styles from './Home.module.css'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

// import Navbar from '../layouts/Navbar'

import { Link } from 'react-router-dom'

export default function Home() {

    const {Logout} = useContext(AuthContext)

    return (
        <nav>
            <li>
                <Link to='/home'><h2>Início</h2></Link>
            </li>
            <button onClick={Logout} >Sair</button>
        </nav>

    )
}