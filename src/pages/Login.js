import styles from './Login.module.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const { SignIn } = useContext(AuthContext)

    function handleSignIn(e) {
        e.preventDefault();
        SignIn(email, senha)
    }

    return (

        <div className={styles.con_main}>

            <h1>Login</h1>

            <div className={styles.center}>
                <form onSubmit={handleSignIn} className={styles.form}>
                    <label><span>E-mail: </span>
                        <input className={styles.input} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    <label><span>Senha: </span>
                        <input className={styles.input} type="password" name="senha" id="senha" onChange={(e) => setSenha(e.target.value)}></input>
                    </label>
                    <button type="submit" className={styles.botao}>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login