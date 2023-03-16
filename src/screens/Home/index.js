import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MyButtom from '../../components/MyButtom';
import { Text } from './styles';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const Home = ({ navigation }) => {
  const [cont, setCont] = useState(0);

  useEffect(() => {
    console.log('chamou na criação do componente');

    return () => {
      console.log('chamou ao destruir o componente');
    };
  }, []);

  async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
        console.error(error.message)
    }
  }

  const logOut = () => {
      auth().signOut()
      .then(() => {
        removeUserSession()
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{name: 'AuthStack'}]
          })
        )
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    console.log('chamou na atualização do componente');
  }, [cont]);

  const incrementar = () => {
    setCont(cont + 1);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  return (
    <View>
      <Text>Contador: {cont}</Text>
      <MyButtom text="Incrementar" onClick={incrementar} />
      <MyButtom text="Decrementar" onClick={decrementar} />
      <MyButtom text="Go Back" onClick={() => navigation.goBack()} />
      <MyButtom text="Cursos" onClick={() => navigation.navigate('Cursos')} />
      <MyButtom text="Log Out" onClick={logOut} />
    </View>
  );
};
export default Home;
