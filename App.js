
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RecipeList from './screens/RecipeList';
import CreateRecipe from './screens/CreateRecipe';
import { colors } from './Color';
import RecipeScreen from './screens/RecipeScreen';
import {CategoryContextProvider} from './context/CategoryContextProvider';


const Stack = createStackNavigator();

export default function App() {

  return (
    <CategoryContextProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'My Recipe Booklet'}} />
      <Stack.Screen name="Recipies" component={RecipeList} />
      <Stack.Screen name="Edit Recipe" component={CreateRecipe} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </CategoryContextProvider>
  );
}
