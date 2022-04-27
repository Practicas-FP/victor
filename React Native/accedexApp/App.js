import 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Pokedex from './app/screens/Pokedex';
import Pokemon from './app/screens/Pokemon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import NavItems from './app/constants/NavItems';
import Header from './app/components/Header';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Pokedex"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >
        {
          NavItems.map(drawer =>
            <Drawer.Screen
              key={drawer.name}
              name={drawer.name}
              options={{
                drawerIcon: ({ focused }) =>
                  drawer.iconType === 'Material' ?
                    <MaterialCommunityIcons
                      name={drawer.iconName}
                      size={24}
                      color={focused ? "#e91e63" : "black"}
                    />
                    :
                    drawer.iconType === 'Feather' ?
                      <Feather
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                      :
                      <FontAwesome5
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />,
                headerShown: true,
                /* header: ({ scene }) => {
                  const { options } = scene.descriptor;
                  const title =
                    options.headerTitle !== undefined
                      ? options.headerTitle
                      : options.title !== undefined
                        ? options.title
                        : scene.route.name;
                  return (
                    <Header screen={title} />
                  );
                } */
              }}
              component={
                drawer.name === 'Pokedex' ? Pokedex
                  : Pokemon
              }
            />
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
