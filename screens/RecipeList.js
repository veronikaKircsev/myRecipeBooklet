import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, ScrollView, View, TouchableOpacity, Image} from 'react-native'
import DatabaseService from '../database_elements/DatabaseService';
import RecipeListItem from '../components/RecipeListItem';
import {CategoryContext} from "../context/CategoryContextProvider";

import { colors } from '../Color';

const databaseService = new DatabaseService();
let key = 0;

export default RecipeList = ({navigation, route}) => {

    const { categoryContext} = useContext(CategoryContext);
    
    const {category, isLiked} = route.params;
    let recipes = databaseService.getAllRecipes();

    navigation.setOptions({
        title: categoryContext
      });

    const [addNewRecipe, setAddNewRecipe] = useState(false);

    function setNewRecipe() {
        setAddNewRecipe(!addNewRecipe);
    }
    
    useEffect(() => {
        if (route.params?.isLiked || addNewRecipe) {
            recipes = databaseService.getAllRecipes();
          }
      }, [isLiked, categoryContext]);

      const handlePress = () => {
        navigation.navigate('Edit Recipe',{category: categoryContext, previous: true, newAdded: setNewRecipe});
    }


    return (
        <ScrollView style={styles.containerView}> 
            {recipes.filter((recipe) => recipe.category === categoryContext).map((recipe) => 
                <RecipeListItem key={key++} recipe={recipe} navigation={navigation}/>)}
            <View style={styles.button}>
              <TouchableOpacity onPress={handlePress}>
                <Image source={require('../assets/appIcons/plus.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        marginTop: 20,
        marginLeft: 20,
    },
    image: {
        width: 50,
        height: 50,
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        borderRadius: 50,
        margin: 20,
        marginTop: 50,
        width: 60,
        height: 60,
      },
});