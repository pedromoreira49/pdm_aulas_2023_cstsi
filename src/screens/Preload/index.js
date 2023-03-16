import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Loading from '../../components/Loading';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CommonActions } from '@react-navigation/native';

const Preload = ({navigation}) => {
    const [loading, setLoading] = useState(false)

    async function retrieveUserSession() {
        try {   
            setLoading(true)
            const session = await EncryptedStorage.getItem("user_session");
            console.log(JSON.parse(session))
            setLoading(false)
            return session !== null ? navigation.dispatch(CommonActions.reset({index: 0,routes: [{name: 'AppStack'}]})) : navigation.navigate('SignIn')
        } catch (error) {
            console.error('Preload, retrieveUserSession: '+ error.message)
            setLoading(false)
            return null
        }
    }

    useEffect(() => {
        const userSession = retrieveUserSession()
    }, [])

    return (
        <View style={styles.container}>
            {loading && <Loading/>}
        </View>
    )
}

export default Preload


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    }
})