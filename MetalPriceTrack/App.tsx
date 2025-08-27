import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { InvestmentProvider } from './src/context/InvestmentContext';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <InvestmentProvider>
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </NavigationContainer>
    </InvestmentProvider>
  );
};

export default App;