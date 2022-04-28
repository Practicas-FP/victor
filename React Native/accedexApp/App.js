import 'react-native-gesture-handler';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Pokedex from './app/screens/Pokedex';
import Pokemon from './app/screens/Pokemon';
import { FontAwesome5 } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function App({route}) {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Pokedex">
        <Drawer.Screen
          initialParams={{ params: route?.params }}
          name="Pokedex"
          component={Pokedex}
          options={{
            title: 'Pokedex',
            drawerIcon: ({ focused }) => (
              <FontAwesome5 name='btc' size={focused ? '#0080FF' : '#999999'} />
            )
          }}
        />

        <Drawer.Screen
          initialParams={{ params: route?.params }}
          name="Pokemon"
          component={Pokemon}
          options={{
            title: 'Pokemon',
            drawerIcon: ({ focused }) => (
              <FontAwesome5 name='btc' size={focused ? '#0080FF' : '#999999'} />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
