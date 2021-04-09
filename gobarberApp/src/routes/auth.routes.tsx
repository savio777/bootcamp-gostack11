import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const AuthRoutes: React.FC = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default AuthRoutes;
