import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BuyScreen from '../screens/BuyScreen';
import SuccessScreen from '../screens/SuccessScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SellScreen from '../screens/SellScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerStyle: { backgroundColor: '#2D3748' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={({ navigation }) => ({
          title: 'Metal Prices',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Profile')}
              title="Profile"
              color="#FFD700"
            />
          ),
        })}
        
      />
      <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: `${route.params.metalData.name} Details` })} />
      <Stack.Screen name="Buy" component={BuyScreen} options={{ title: 'Invest Now' }} />
      <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Portfolio' }} />
      <Stack.Screen 
        name="Sell" 
        component={SellScreen} 
        options={({ route }) => ({ 
          title: `Sell ${route.params.metalName}` 
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;