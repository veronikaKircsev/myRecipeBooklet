import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { colors } from "../Color";
import DatabaseService from "../database_elements/DatabaseService";

const database = new DatabaseService();
const RecipeListItem = ({recipe, navigation}) => {

    const [like, setLike] = useState(recipe.isLiked==='true'? true:false);

    function handleLike() {
        setLike(!like);
        database.updateLike(recipe.name);
    };
      
     return (
        <TouchableOpacity style={styles.button}
        onPress={() => {navigation.navigate('Recipe',{
            category: recipe.category,
            name: recipe.name,
            ingredients:recipe.ingredients,
            instructions: recipe.instructions,
            notice: recipe.notice,
            like: like,
            handleLike: handleLike})}}>
                    <View> 
                    <Text style={styles.text}>{recipe.name}</Text>
                    <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
                        {like?
                    (<Image style={styles.image} source={require('../assets/appIcons/like.png')}/>):(
                    <Image style={styles.image} source={require('../assets/appIcons/not-like.png')}/>)}
                    </TouchableOpacity>
                    </View> 
                    </TouchableOpacity>
     );
    }

const styles = StyleSheet.create({
    button: {
      flex: 1,
      padding: 20,
      borderRadius: 10,
      backgroundColor: colors.background,
      marginBottom: 10,
      width: "90%",
    },
    text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.text,
    },
    image: {
        width: 30,
        height: 30,
    },
    likeButton: {
        position: 'absolute',
        right: 10,
        width: 30,
        height: 30,
    }
});

export default RecipeListItem;
