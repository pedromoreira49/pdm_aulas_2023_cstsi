import React from 'react'
import { Text, View } from 'react-native'
import MyButtom from '../../components/MyButtom'

const SignIn = ({ navigation }) => {
    return (
        <View>
            <Text>Sign In</Text>
            <MyButtom text="Go Home" onClick={() => navigation.navigate('Home')} />
        </View>
    )
}

export default SignIn
