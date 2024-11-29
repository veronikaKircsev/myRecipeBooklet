import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image  } from 'react-native';
import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';


const databaseService = new DatabaseService();

export default RecipeScreen = ({navigation, route}) => {

    const {category, name, ingredients, instructions, notice, like, handleLike} = route.params;

    const [recipeLike, setLike] = useState(like);

    const [nameRecipe, setNameRecipe] = useState(name);

    navigation.setOptions({
        title: nameRecipe
      });

    function setNewNameRecipe(newName) {
        setNameRecipe(newName);
    }

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={styles.likeButton} onPress={()=>{databaseService.updateLike(name),
                handleLike(), setLike(!recipeLike)
            }}>
                            {recipeLike ?
                        (<Image style={styles.image} source={require('../assets/appIcons/like.png')}/>):(
                        <Image style={styles.image} source={require('../assets/appIcons/not-like.png')}/>)}
                        </TouchableOpacity>
        ),
      });
    }, [navigation, recipeLike]);

  
   
    return (
        <ScrollView style={styles.container}>
            <View style={styles.elements}>
                <Text style={styles.text}>Ingredients:</Text>
                <Text style={styles.textContainer}>{ingredients}</Text>
            </View>
            <View style={styles.elements}>
                <Text style={styles.text}>Instructions:</Text>
                <Text style={styles.textContainer}>{instructions}</Text>
            </View>
            <View style={styles.elements}>
            <Text style={styles.text}>Notice:</Text>
            <Text style={styles.textContainer}>{notice}</Text>
            </View>
            <TouchableOpacity style={styles.editContainer} onPress={() => {navigation.navigate('Edit Recipe',
                {category: category, 
                name: name, 
                ingredients: ingredients, 
                instructions: instructions, 
                notice: notice,
                newName: setNewNameRecipe}
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
    }
});