import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CountryInfoScreen from './screens/CountryInfoScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Accueil') {
            iconName = 'globe';
            iconSize = 30;
          } else if (route.name === 'Favoris') {
            iconName = 'star';
            iconSize = 30;
          }

          return <FontAwesome name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#8bc9ff',
        tabBarInactiveTintColor: '#335561',
        tabBarShowLabel: false,
        headerShown: false,
      })}
      

      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Favoris" component={FavoritesScreen} />
        <Tab.Screen name="countryInfo" component={CountryInfoScreen} options={{ tabBarButton: () => null }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
