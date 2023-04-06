import React, {useContext} from 'react';
import MyButtom from '../../components/MyButtom';
import {Container, Text} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {EstudanteContext} from '../../context/EstudanteProvider';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';

const Home = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);

  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
    } catch (error) {
      console.error(error.message);
    }
  }

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

      {estudantes.map((v, k) => {
        return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
      })}

      <AddFloatButton onClick={() => routeStudent(null)} />
      <MyButtom text="Sair" onClick={logOut} />
    </Container>
  );
};
export default Home;
