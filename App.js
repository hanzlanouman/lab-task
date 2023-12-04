import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import ShowData from './src/screens/ShowData';
import Input from './src/screens/Input';
import DetailData from './src/screens/DetailData';
import DataNavigation from './src/screens/ShowData';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='All Data'>
        <Tab.Screen
          name='All Data'
          component={DataNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen name='Input Data' component={Input} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
