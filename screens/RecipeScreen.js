import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image  } from 'react-native';
import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';
import FeedBack from '../components/Feedback';
import {DBChangedContext} from '../context/DBChangedContextProvider';
import FileSystemService from '../database_elements/FileSystemService';

const databaseService = new DatabaseService();

export default RecipeScreen = ({navigation, route}) => {
    const {recipe,  handleLike} = route.params;

    const test = databaseService.getRecipe(recipe.name);
    console.log("RecipeScreen: " + JSON.stringify(test));

    console.log("RecipeScreen: " + JSON.stringify(test));

    console.log(recipe.isLiked);

    const [recipeLike, setLike] = useState(recipe.isLiked);

    const [nameRecipe, setNameRecipe] = useState(recipe.name);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);
    const [notice, setNotice] = useState(recipe.notice);
    const [dish, setDish] = useState(test.dish);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const {dBChangedContext, setDBChangedContext} = useContext(DBChangedContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    navigation.setOptions({
        title: nameRecipe
      });
    }, [nameRecipe]);

    function setNewNameRecipe(newName) {
        setNameRecipe(newName);
    }

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={styles.likeButton} onPress={()=>{databaseService.updateLike(recipe.name),
                handleLike(), setLike(!recipeLike)
            }}>
                            {!recipeLike ?
                        (<Image style={styles.image} source={require('../assets/appIcons/like.png')}/>):(
                        <Image style={styles.image} source={require('../assets/appIcons/not-like.png')}/>)}
                        </TouchableOpacity>
        ),
      });
    }, [navigation, recipeLike]);

    useEffect(() => {
        if(showModal){
            setShowSavedModal(true);
            }else{
            setShowModal(false);
            }
    }, [dBChangedContext]);

  
   
    return (
        <ScrollView style={styles.container}>
            <FeedBack visible={showSavedModal} onClose={()=> setShowSavedModal(false)} />
            
            {/* <View style={styles.elements}>
                <Text style={styles.text}>Ingredients:</Text>
                <Text style={styles.textContainer}>{ingredients}</Text>
            </View> */}
            
            <View style={styles.elements}>
                <Text style={styles.text}>Ingredients:</Text>
                    {ingredients.startsWith("file://") ? (
                        <Image style={styles.imagePreview} source={{ uri: ingredients }} />
                            ) : (
                        <Text style={styles.textContainer}>{ingredients}</Text>
                        )}
            </View>
            
            {/* <View style={styles.elements}>
                <Text style={styles.text}>Instructions:</Text>
                <Text style={styles.textContainer}>{instructions}</Text>
            </View> */}

            <View style={styles.elements}>
                <Text style={styles.text}>Instructions:</Text>
                    {instructions.startsWith("file://") ? (
                        <Image style={styles.imagePreview} source={{ uri: instructions }} />
                            ) : (
                        <Text style={styles.textContainer}>{instructions}</Text>
                        )}
            </View>
            
            
            {/* <View style={styles.elements}>
            <Text style={styles.text}>Notice:</Text>
            <Text style={styles.textContainer}>{notice}</Text>
            </View> */}

            <View style={styles.elements}>
                <Text style={styles.text}>Notice:</Text>
                {notice ? (
                    notice.startsWith("file://") ? (
                        <Image style={styles.imagePreview} source={{ uri: notice }} />
                            ) : (
                        <Text style={styles.textContainer}>{notice}</Text>
                        )
                
                ) : null}
            </View>

            <View style={styles.elements}>
                <Text style={styles.text}>Dish:</Text>
                {dish ? (
                    dish.startsWith("file://") ? (
                        <Image style={styles.imagePreview} source={{ uri: dish }} />
                            ) : (
                        <Text style={styles.textContainer}>{dish}</Text>
                        )
                
                ) : null}
    	    </View>        

            <TouchableOpacity style={styles.editContainer} onPress={() => {navigation.navigate('Edit Recipe',
                {category: recipe.category, 
                name: recipe.name, 
                ingredients: recipe.ingredients, 
                instructions: recipe.instructions, 
                notice: recipe.notice,
                newName: setNewNameRecipe,
                newIngredients: setIngredients,
                newInstructions: setInstructions,
                newNotice: setNotice
            }
            )}}>
                <Image style={styles.edit} source={require('../assets/appIcons/modify.png')}/>
            </TouchableOpacity>
        </ScrollView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    elements: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
        borderRadius: 10,
        margin: 10,
    },
    text:
    {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.text,
    },
    textContainer: {
        padding: 10,
        backgroundColor: 'white' ,
        borderRadius: 10,
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
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
    },
    edit:{
        width: 40,
        height: 40,
    },
    editContainer:{
        width: 60,
        height: 60,
        backgroundColor: colors.background,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderBlockColor: colors.text,
        borderWidth: 2,
        borderStyle: 'solid',
        margin:10,
    },
    imagePreview: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 10,
    },
});