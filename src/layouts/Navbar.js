import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
                <li>
                    <Link to='/'><h2>Início</h2></Link>
                </li>
                <li>
                    <Link to='/login'><h2>Login</h2></Link>
                </li>
        </nav>
    )
}
