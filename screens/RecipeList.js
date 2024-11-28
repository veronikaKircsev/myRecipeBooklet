import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import DatabaseService from '../database_elements/DatabaseService';
import RecipeListItem from '../components/RecipeListItem';

const databaseService = new DatabaseService();
let key = 0;

export default RecipeList = ({navigation, route}) => {

    const {category, isLiked} = route.params;
    let recipes = databaseService.getRecipesByCategory(category);

    React.useEffect(() => {
        if (route.params?.isLiked) {
            recipes = databaseService.getRecipesByCategory(category);
          }
        
      }, [isLiked]);

    return (
        <ScrollView style={styles.containerView}> 
            {recipes.map((recipe) =>
                <RecipeListItem key={key++} recipe={recipe} navigation={navigation}/>)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        marginTop: 20,
        marginLeft: 20,
    }
});