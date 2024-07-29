import { createContext, useState } from 'react'
import { collection, getDocs, query, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebaseConnection'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContatoContext = createContext({})

const ContatosRef = collection(db, "contatos")

const q = query(ContatosRef)

export default function ContatoProvider({ children }) {

    const [listaContatos, setListaContatos] = useState()

    async function BuscarContatos() {

        await getDocs(q)
            .then((snapshot) => {
                let lista = [];
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        contato: doc.data().contato
                    })
                    setListaContatos(lista)

                })
            })
            .catch((err) => console.log(err))
    }

    async function DeletarDoc(id) {

        await deleteDoc(doc(db, "contatos", id))
            .then(() => {
                toast.success("Contato deletado com sucesso!")
            })
            .catch((err) => console.log(err))
    }

    async function AtualizarDoc(id, nome, contato) {

        console.log(id, nome, contato)

        await updateDoc(doc(db, "contatos", id), {
            nome: nome,
            contato: contato
        })
            .then(() => {
                toast.success("Contato atualizado com sucesso!")
            })
            .catch((err) => console.log(err))
    }

    async function SubmitData(nome, contato) {

        await addDoc(ContatosRef, {
            nome: nome,
            contato: contato
        })
        .then(() => {
            toast.success("Contato adicionado!");
        })
            .catch((err) => console.log(err))
    }

    return (
        <ContatoContext.Provider value={{ teste: "ok", BuscarContatos, listaContatos, DeletarDoc, SubmitData, AtualizarDoc }}>
            {children}
        </ContatoContext.Provider>
    )
}