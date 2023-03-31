import React, {createContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const EstudanteContext = createContext({})

export const EstudanteProvider = ({children}) => {

    useEffect(() => {
        const listener = firestore()
            .collection('estudantes')
            .orderBy('nome')
            .onSnapshot((snapshot) => {
                //console.log(snapshot)
            })

        return () =>{listener()}
    }, [])

    return (
        <EstudanteContext.Provider value={{}}>
            {children}
        </EstudanteContext.Provider>
    )
}
