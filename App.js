
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import AddContact from './AddContact';
import LogIn from './LogIn';
import UpdateContact from './UpdateContact';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateContact" component={UpdateContact} options={{ headerShown: false }} />
        <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


