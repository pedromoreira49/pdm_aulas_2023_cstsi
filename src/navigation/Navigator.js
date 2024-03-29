/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Cursos from '../screens/Cursos';
import ForgotPassword from '../screens/ForgotPassword';
import Estudante from '../screens/Estudante';

import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Alunos',
        tabBarIcon: () => (
          <Icon name="people" color={COLORS.primary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Cursos"
      component={Cursos}
      options={{
        tabBarLabel: 'Cursos',
        tabBarIcon: () => (
          <Icon name="rocket" color={COLORS.primary} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={Estudante} name="Estudante" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
