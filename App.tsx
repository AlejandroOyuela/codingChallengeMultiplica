import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/screens/mainScreen';
import ProductScreen from './src/screens/productScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{title: 'Products', headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={({route}) => ({
            title: route.params.product.product,
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
