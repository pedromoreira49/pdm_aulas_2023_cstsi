import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Image, TextInput, Alert } from 'react-native'
import {COLORS} from '../../assets/colors';
import auth from '@react-native-firebase/auth'
import MeuButton from '../../components/MyButtom';


const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const registrar = async () => {
        if(email != '' || password != ''){
            try{
                setLoading(true)
                await auth().createUserWithEmailAndPassword(email, password)
                setLoading(false)
                Alert.alert("Sucesso", "Registro realizado com sucesso!", [
                    {
                        text: "ok",
                        onPress: () => navigation.goBack()
                    }
                ])
                
            }catch(err){
                setLoading(false)
                switch(err.code){
                    case 'auth/email-already-in-use':
                        Alert.alert("Error", "Email já está em uso.")
                        break;
                    case 'auth/invalid-email':
                        Alert.alert("Error", "Email inválido.")
                        break;
                    case 'auth/operation-not-allowed':
                        Alert.alert("Error", "Operação não permitida.")
                        break;
                    case 'auth/weak-password':
                        Alert.alert("Error", "Senha muito fraca.")
                        break;
                }
            }
        }else{
            Alert.alert("Error", "Por favor, digite um email e senha!")
        }
    }

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
                        onChangeText={(t) => setEmail(t)}
                        onEndEditing={() => this.passTextInput.focus()}
                    />
                    <TextInput
                        ref={(ref) => {
                        this.passTextInput = ref;
                        }}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Senha"
                        keyboardType="default"
                        returnKeyType="go"
                        onChangeText={(t) => setPassword(t)}
                    />
                    <MeuButton text="Registrar" onClick={registrar} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

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


export default SignUp
