import { createContext, useState } from 'react'
import { collection, getDocs, query, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../services/firebaseConnection'

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
                    console.log(doc.data())
                    setListaContatos(lista)

                })
            })
            .catch((err) => console.log(err))
    }

    async function CriarContatos() {

        await setDoc(doc(db, "contatos", "contatos_teste"), {
            nome: "Soraya",
            idade: 54,
            cancelado: false,
            contato: "(47) 99185-9902"
        })
            .then((resul) => {
                console.log("documento criado")
            })
            .catch((err) => console.log(err))
    }

    async function DeletarDoc() {

        await deleteDoc(doc(db, "contatos", "contatos_teste"))
            .then((resul) => {
                alert("documento deletado")
            })
            .catch((err) => console.log(err))
    }


    return (
        <ContatoContext.Provider value={{ teste: "ok", BuscarContatos, CriarContatos, listaContatos, DeletarDoc }}>
            {children}
        </ContatoContext.Provider>
    )
}