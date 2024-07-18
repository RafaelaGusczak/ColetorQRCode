import { createContext, useState } from "react";
import { auth } from '../services/firebaseConnection';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    const [isSignIn, setIsSignIn] = useState(false)

    const Navigate = useNavigate()

    function SignIn(email, senha) {

        console.log({ email })

        signInWithEmailAndPassword(auth, email, senha)
            .then((result) => {
                console.log("Você está logado!");
                setIsSignIn(true);
                Navigate("/home")  
            })
            .catch((err) => console.log(err))

    }

    function Logout() {
        signOut(auth);
        setIsSignIn(false)
    }

    return (

        <AuthContext.Provider value={{ isSignIn, SignIn, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}