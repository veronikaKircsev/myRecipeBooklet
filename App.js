import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RecipeList from './screens/RecipeList';
import CreateRecipe from './screens/CreateRecipe';
import { colors } from './Color';

const Stack = createStackNavigator();
export default function App() {
  return (
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
      <Stack.Screen name="Home" component={HomeScreen} options={{
            headerLeft: null, title: 'My Recipe Booklet'
          }} />
      <Stack.Screen name="Recipies" component={RecipeList} />
      <Stack.Screen name="Edit Recipe" component={CreateRecipe} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
