import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, TabRouter } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home'
import SignIn from './src/screens/SignIn';
import Preload from './src/screens/Preload';
import SignUp from './src/screens/SignUp';
import Cursos from './src/screens/Cursos';
import ForgotPassword from './src/screens/ForgotPassword';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AppStack = () => (
  <Tab.Navigator initialRouteName='Home'
    screenOptions={{headerShown: false}}
  >
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="Cursos" component={Cursos}/>
  </Tab.Navigator>
)

const AuthStack = () => (
  <Stack.Navigator initialRouteName='Preload'
    screenOptions={{headerShown: false}}
  >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
)

const App = ({ navigation }) => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AuthStack' 
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App