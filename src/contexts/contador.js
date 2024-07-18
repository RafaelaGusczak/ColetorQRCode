import { createContext, useContext } from "react";

export const ContadorContext = createContext({})

export default function ContadorProvide({ children }) {

    console.log("ok")

    return (
        <ContadorContext.Provider value={{numero: 11}}>
            {children}
        </ContadorContext.Provider>
    )

}

