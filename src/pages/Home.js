import styles from './Home.module.css'
import { AuthContext } from '../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContatoContext } from '../contexts/contatos'
import Modal from "react-modal"

export default function Home() {

    const { BuscarContatos, listaContatos, DeletarDoc } = useContext(ContatoContext)

    const { Logout } = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')

    const [modalIsOpen, setIsOpen] = useState(false)

    useEffect(() => {
        BuscarContatos()
    }, [])

    function ModalOpen() {
        setIsOpen(true)
    }

    function ModalClosed() {
        setIsOpen(false)
    }

    return (

        <div className={styles.main}>

            <nav className={styles.navbar}>
                <li>
                    <Link to='/home'>
                        <img className={styles.logo} src="../../assets/logo_metalgroup.png" alt='Metal Group' />
                    </Link>
                </li>
                <div className={styles.link_nav}>
                    <li>
                        <Link to='/home'>Início</Link>
                    </li>
                    <li>
                        <Link to='/contatos'>Contatos</Link>
                    </li>
                    <li>
                        <Link to='/empresa'>Empresa</Link>
                    </li>
                </div>
                <button className={styles.btn} onClick={Logout}>Sair</button>
            </nav>

            <div className={styles.lista}>

                <div className={styles.topo}>
                    <button className={styles.btn_deletar} onClick={ModalOpen} >Adicionar</button>
                    <Modal className={styles.con_modal}
                        isOpen={modalIsOpen}
                        onRequestClose={ModalClosed}
                        contentLabel="Adicionar"
                    >
                        <div className={styles.center_modal}>
                            <div className={styles.topo_modal}>
                                <button className={styles.btn_fechar} onClick={ModalClosed}>Fechar</button>
                            </div>
                            <div className={styles.titulo}>
                                <h2>Insira os dados:</h2>
                                <form className={styles.form}>
                                    <div className={styles.dados}>
                                        <label>Nome:</label>
                                        <input className={styles.input} type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)}></input>
                                        <label>Contato:</label>
                                        <input className={styles.input} type="text" name="contato" id="contato" onChange={(e) => setContato(e.target.value)}></input>
                                    </div>
                                    <div className={styles.btn_salvar}>
                                        <button type="submit" className={styles.botao}>Salvar</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </Modal>


                    <button onClick={DeletarDoc} className={styles.btn_deletar}>Deletar lista</button>
                </div>

                <div className={styles.campos}>
                    <p>Nome</p>
                    <p>Contato</p>
                </div>

                <div className={styles.resultados}>
                    <div className={styles.nomes}>
                        {listaContatos && listaContatos.map((item, index) => {
                            return (
                                <p key={index}>
                                    {item.nome}
                                </p>
                            )
                        })}
                    </div>
                    <div className={styles.contatos}>
                        {listaContatos && listaContatos.map((item, index) => {
                            return (
                                <p key={index}>
                                    {item.contato}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}