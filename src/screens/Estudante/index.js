import React, {useContext, useEffect, useState} from 'react';
import MyButtom from '../../components/MyButtom';7
import firestore from '@react-native-firebase/firestore'
import { EstudanteContext } from '../../context/EstudanteProvider';

import {Container, TextInput} from './styles';
import { Alert } from 'react-native';

const Estudante = ({route}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(false);
  const {saveUser, eraseUser} = useContext(EstudanteContext)

  useEffect(() => {
    if(route.params.value){
      setUid(route.params.value.uid)
      setNome(route.params.value.nome)
      setCurso(route.params.value.curso)
    }
  }, [route])

  const save = async () => {
    saveUser(uid, nome, curso)
  };

  const erase = async () => {
    Alert.alert('Opa!', 'Você tem certeza que deseja apagar um estudante?', [
      {
        text: 'Cancel',
        onPress: () => {}
      },
      {
        text: 'OK',
        onPress: async () => {
          await eraseUser(uid)
          
        }
      }
    ])
  }

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCurso(t)}
        value={curso}
      />
      <MyButtom text="Salvar" onClick={save} />
      <MyButtom text="Excluir" onClick={erase} />
    </Container>
  );
};

export default Estudante;