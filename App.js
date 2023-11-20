import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CountryInfoScreen from './screens/CountryInfoScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import favorites from './reducers/favorites';

const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { favorites },
});

export default function App() {
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
          
            if (route.name === 'Accueil' || route.name === 'CountryInfo') {
              iconName = 'globe';
              return (
                <TouchableOpacity onPress={() => navigation.reset({
                  index: 0,
                  routes: [{ name: 'Accueil' }],
                })}>
                  <FontAwesome name={iconName} size={28} color={color} />
                </TouchableOpacity>
              );
            } else if (route.name === 'Favoris') {
              iconName = focused ? 'star' : 'star-o';
            }

            return <FontAwesome name={iconName} size={28} color={color} />;
          },
          tabBarActiveTintColor: '#8bc9ff',
          tabBarInactiveTintColor: '#335561',
          tabBarShowLabel: true,
          headerShown: false,
        })}
        
        >
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Favoris" component={FavoritesScreen} />
          <Tab.Screen name="CountryInfo" component={CountryInfoScreen} options={{ tabBarButton: () => null }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>

  );
}