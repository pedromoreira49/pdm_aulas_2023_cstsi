import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {COLORS} from '../../assets/colors';
import auth from '@react-native-firebase/auth';
import MeuButton from '../../components/MyButtom';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = async () => {
    if (email !== '') {
      await auth()
        .sendPasswordResetEmail(email)
        .then(response => {
          Alert.alert(
            'Sucesso',
            'Enviamos um email de recuperação para você.',
            [
              {
                text: 'Ok',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/invalid-email':
              Alert.alert('Error', 'Email inválido');
              break;
            case 'auth/user-not-found':
              Alert.alert('Error', 'Usuário não encontrado');
              break;
          }
        });
    } else {
      Alert.alert('Error', 'Informe o campo email!');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../../assets/imagens/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <MeuButton text="Enviar código" onClick={recover} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.accentSecundary,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: COLORS.accentSecundary,
    marginLeft: 5,
  },
});

export default ForgotPassword;
