import React, {useContext, useEffect, useState} from 'react';
import MyButtom from '../../components/MyButtom';
import {Container, Text} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {EstudanteContext} from '../../context/EstudanteProvider';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import {TextInput, View} from 'react-native';

const Home = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);
  const [alunos, setAlunos] = useState([]);
  const [estudanteFiltrados, setEstudanteFiltrado] = useState('');

  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    var arr = [];
    estudantes.forEach(e => {
      if (e.nome.toLowerCase().includes(estudanteFiltrados.toLowerCase())) {
        arr.push(e);
      }
    });
    setAlunos(arr);
  }, [estudanteFiltrados, estudantes]);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        removeUserSession();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          }),
        );
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  const routeStudent = value => {
    navigation.navigate('Estudante', {value});
  };

  return (
    <Container>
      <Text>Estudantes</Text>
      <View>
        <TextInput
          placeholder="Pesquisar"
          onChangeText={t => setEstudanteFiltrado(t)}
        />
      </View>
      {alunos.length > 0
        ? alunos.map((v, k) => {
            return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
          })
        : estudantes.map((v, k) => {
            return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
          })}
      <AddFloatButton onClick={() => routeStudent(null)} />
      <MyButtom text="Sair" onClick={logOut} />
    </Container>
  );
};
export default Home;
