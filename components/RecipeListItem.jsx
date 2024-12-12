import React, {useState, useContext} from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { colors } from "../Color";
import DatabaseService from "../database_elements/DatabaseService";
import {DBChangedContext} from '../context/DBChangedContextProvider';

const database = new DatabaseService();
const RecipeListItem = ({recipe, navigation}) => {

    const [like, setLike] = useState(recipe.isLiked==='true'? true:false);
    const {dBChangedContext, setDBChangedContext} = useContext(DBChangedContext);

    function handleLike() {
        setLike(!like);
        database.updateLike(recipe.name);
        setDBChangedContext(!dBChangedContext);
    };
      
     return (
        <TouchableOpacity style={styles.button}
        onPress={() => {navigation.navigate('Recipe',{
            recipe: recipe,
            handleLike: handleLike,
            like: like})}}>
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
        width: 50,
        height: 50,
    }
});

export default RecipeListItem;
