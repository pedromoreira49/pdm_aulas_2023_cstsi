import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';


import Home from './src/screens/Home'
import SignIn from './src/screens/SignIn';

const Stack = createNativeStackNavigator()

const App = ({ navigation }) => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App