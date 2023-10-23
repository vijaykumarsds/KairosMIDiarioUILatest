// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Login';
import { UserProvider } from './src/UserContext'; 
import Signup from './src/Signup';
import Dashboard1 from './src/Dashboard';
import RecipeDetails from './src/RecipeDetails';
import { VotesProvider } from './src/VotesContext';
import ForgotPasswordValidation from './src/ForgotPasswordValidation';
import PasswordChange from './src/PasswordChange';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <VotesProvider>
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard1} />
        <Stack.Screen name="ForgotPasswordValidation" component={ForgotPasswordValidation} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
    </VotesProvider>
  );
}

export default App;