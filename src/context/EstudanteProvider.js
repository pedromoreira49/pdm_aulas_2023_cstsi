import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const EstudanteContext = createContext({});

export const EstudanteProvider = ({children}) => {
  const [estudantes, setEstudantes] = useState([]);

  const saveUser = async (uid, nome, curso) => {
    if(!uid){
      await firestore()
      .collection('estudantes')
      .doc()
      .set({nome, curso}, {merge: true})
      .then(() => Alert.alert('Sucesso', 'Estudante cadastrado com sucesso'))
      .catch(err => console.error('Estudante, Save user: ' + err.message))
    }else{
      await firestore()
      .collection('estudantes')
      .doc(uid)
      .set({nome, curso}, {merge: true})
      .then(() => Alert.alert('Sucesso', 'Estudante cadastrado com sucesso'))
      .catch(err => console.error('Estudante, Save user: ' + err.message))
    }
  }

  const eraseUser = async (uid) => {
    await firestore()
      .collection('estudantes')
      .doc(uid)
      .delete()
      .then(() => Alert.alert('Sucesso!', 'Estudante removido com sucesso'))
      .catch(err => console.error('Estudante, Erase user: ' + err.message))
  }

  useEffect(() => {
    const listener = firestore()
      .collection('estudantes')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        let data = [];
        snapShot.forEach(doc => {
          //console.log(doc.id, ' => ', doc.data());
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            curso: doc.data().curso,
          });
        });
        setEstudantes(data);
      });

    return () => {
      listener();
    };
  }, []);

  return (
    <EstudanteContext.Provider value={{estudantes, saveUser, eraseUser}}>
      {children}
    </EstudanteContext.Provider>
  );
};