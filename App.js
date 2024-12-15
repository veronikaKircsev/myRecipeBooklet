
import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RecipeList from './screens/RecipeList';
import EditRecipe from './screens/EditRecipe';
import { colors } from './Color';
import RecipeScreen from './screens/RecipeScreen';
import {CategoryContextProvider} from './context/CategoryContextProvider';
import CreateCategory from './screens/CreateCategory';
import {DBChangedContextProvider} from './context/DBChangedContextProvider';
import CameraScreen from './camera/Camera';
import { CameraContextProvider } from './context/CameraContextProvider';
import { LikeContextProvider } from './context/LikeContextProvider';
import DatabaseService from './database_elements/DatabaseService';

const Stack = createStackNavigator();
const databaseService = new DatabaseService();

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);

      useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
          if (appState === 'active' && nextAppState.match(/inactive|background/)) {
            console.log('App has gone to sleep');
            databaseService.shootDown();
          }
          setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
          subscription.remove();
        };
      }, [appState]);
  

  return (
    <CategoryContextProvider>
      <DBChangedContextProvider>
        <CameraContextProvider>
          <LikeContextProvider>
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
                <Stack.Screen name="Edit Recipe" component={EditRecipe} />
                <Stack.Screen name="Recipe" component={RecipeScreen} />
                <Stack.Screen name="Create Category" component={CreateCategory} />
                <Stack.Screen name="Camera" component={CameraScreen} />
              </Stack.Navigator>
          </NavigationContainer>
        </LikeContextProvider>
      </CameraContextProvider>
    </DBChangedContextProvider>
  </CategoryContextProvider>
  );
}
