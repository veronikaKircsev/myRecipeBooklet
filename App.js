import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RecipeList from './screens/RecipeList';
import CreateRecipe from './screens/CreateRecipe';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerStyle: {
            backgroundColor: '#EEE3CB',
          },
          headerTintColor: '#65647C',
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
