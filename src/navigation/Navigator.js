import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Cursos from '../screens/Cursos';
import ForgotPassword from '../screens/ForgotPassword';

import { COLORS } from '../assets/colors';

Icon.loadFont()

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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

const AppStack = () => (
  <Tab.Navigator initialRouteName='Home'
    screenOptions={{headerShown: false}}
  >
    <Tab.Screen name="Home" component={Home} options={{
      tabBarIcon: () => {
        <Icon name="people" color={COLORS.white} size={20} />
      }
    }}/>
    <Tab.Screen name="Cursos" component={Cursos} options={{
      tabBarIcon: () => {
        <Icon name="people" color={COLORS.white} size={20} />
      }  
    }}/>
  </Tab.Navigator>
)

const Navigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AuthStack' 
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen component={AuthStack} name="AuthStack" />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator