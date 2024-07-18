import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

export default function Private({children}) {

    const { isSignIn } = useContext(AuthContext)

    if(!isSignIn) {
        return <Navigate to="/" />
    }

    return children
}