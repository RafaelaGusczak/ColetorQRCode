import styles from './Home.module.css'
import { AuthContext } from '../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContatoContext } from '../contexts/contatos'
import Modal from "react-modal"
import { FaTrashAlt } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";
import { IMaskInput } from "react-imask";



export default function Home() {

    const { BuscarContatos, listaContatos, DeletarDoc, SubmitData, AtualizarDoc } = useContext(ContatoContext)

    const { Logout } = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')

    const [modalIsOpen, setIsOpen] = useState(false)

    const [modalDeletar, setModalDeletar] = useState(false)

    const [itemSelected, setItemSelected] = useState()

    const [userAction, setUserAction] = useState()

    useEffect(() => {
        BuscarContatos()
    }, [])

    function ModalDeletarAberto(id) {
        setItemSelected(id)
        setModalDeletar(true)
    }

    function ModalDeletarFechado() {
        setModalDeletar(false)
    }

    function ModalOpen() {
        setIsOpen(true)
    }

    function ModalClosed() {
        setIsOpen(false)
    }

    function HandleSubmit(e) {

        e.preventDefault();
        if (userAction == "edit") {
            AtualizarDoc(itemSelected, nome, contato);
            console.log("editar ok")
        } else {
            SubmitData(nome, contato)
        }
        BuscarContatos();
        LimparDados()
        ModalClosed()
    }

    function Deletar(id) {
        DeletarDoc(id);
        BuscarContatos()
        ModalDeletarFechado()
    }

    function LimparDados() {
        setNome("");
        setContato("");
    }

    function OpenModalWithEdit(item) {
        setNome(item.nome);
        setContato(item.contato);
        setItemSelected(item.id)
        ModalOpen();
        setUserAction("edit");
    }

    function OpenModalWithCreate() {
        ModalOpen();
        LimparDados();
        setUserAction("create")
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
                    <button className={styles.btn_deletar} onClick={() => OpenModalWithCreate()}>Adicionar</button>
                    <Modal className={styles.con_modal}
                        isOpen={modalIsOpen}
                        onRequestClose={ModalClosed}
                        contentLabel="Adicionar"
                        ariaHideApp={false}
                    >
                        <div className={styles.center_modal}>
                            <div className={styles.topo_modal}>
                                <button className={styles.btn_fechar} onClick={ModalClosed}>Fechar</button>
                            </div>
                            <div className={styles.titulo}>
                                <h2>Insira os dados:</h2>

                                <form onSubmit={HandleSubmit} className={styles.form}>
                                    <div className={styles.dados}>

                                        <label className={styles.label_dados}>Nome:</label>

                                        <input className={styles.input} value={nome} type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)}
                                       
                                
                                        ></input>
                                   

                                        <label className={styles.label_dados}>Contato:</label>

                                        <IMaskInput className={styles.input} mask="(00) 00000-0000"
                                            placeholder='(00) 00000-0000' value={contato} type="text" name="contato" id="contato" onChange={(e) => setContato(e.target.value)}></IMaskInput>

                                    </div>
                                    <div className={styles.btn_salvar}>
                                        <button type="submit" className={styles.botao}>Salvar</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </Modal>
                </div>

                <div className={styles.campos}>
                    <p>Nome</p>
                    <p>Contato</p>
                </div>

                <div className={styles.resultados}>
                    <div className={styles.nomes}>
                        {listaContatos && listaContatos.map((item, index) => {
                            return (
                                <div key={index} className={styles.p_nomes}>
                                    <p>
                                        {item.nome}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.contatos}>
                        {listaContatos && listaContatos.map((item, index) => {
                            return (
                                <div key={index} className={styles.contato_icons}>
                                    <div className={styles.p_contato}>
                                        <p>
                                            {item.contato}
                                        </p>
                                    </div>
                                    <div className={styles.icones}>
                                        <FaTrashAlt onClick={() => ModalDeletarAberto(item.id)} className={styles.trash} />
                                        <RiEditFill onClick={() => OpenModalWithEdit(item)} className={styles.edit} />
                                    </div>
                                </div>
                            )
                        })}
                        <Modal className={styles.con_modal}
                            isOpen={modalDeletar}
                            onRequestClose={ModalDeletarFechado}
                            contentLabel="Deletar"
                            ariaHideApp={false}
                        >
                            <div className={styles.center_modalDeletar}>
                                <h1>Atenção!</h1>

                                <div className={styles.confirmacao}>
                                    <p>Deseja mesmo deletar esse contato?</p>
                                </div>

                                <div className={styles.buttons}>
                                    <button className={styles.btn_cancelar} onClick={ModalDeletarFechado}>Cancelar</button>
                                    <button className={styles.btn_confirmar} onClick={() => Deletar(itemSelected)}>Confirmar</button>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}