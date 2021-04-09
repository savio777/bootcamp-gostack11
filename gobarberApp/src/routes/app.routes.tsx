import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Dashboard from '../screens/Dashboard';

const AuthRoutes: React.FC = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Stack.Screen name="Dashboard" component={Dashboard} />
  </Stack.Navigator>
);

export default AuthRoutes;
