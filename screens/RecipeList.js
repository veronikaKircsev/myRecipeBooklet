import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList} from 'react-native'
import DatabaseService from '../database_elements/DatabaseService';
import RecipeListItem from '../components/RecipeListItem';
import {CategoryContext} from "../context/CategoryContextProvider";
import { colors } from '../Color';
import FeedBack from '../components/Feedback';
import {DBChangedContext} from '../context/DBChangedContextProvider';
import { LikeContext } from '../context/LikeContextProvider';

const databaseService = new DatabaseService();
let key = 0;

export default RecipeList = ({navigation, route}) => {

    const { categoryContext} = useContext(CategoryContext);
    const {homeScreen} = route.params !== undefined ? route.params : false;

    const [search, setSearch] = useState(route.params !== undefined ? homeScreen : false);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const {dBChangedContext, setDBChangedContext} = useContext(DBChangedContext);
    const {likeContext, setLikeContext} = useContext(LikeContext);

    const [searchText, setSearchText] = useState('');
    
    let recipes = databaseService.getAllRecipes();
    let sortedRecipe = [...recipes].sort((a, b) => { 
      const aLiked = a.isLiked === 'true';
      const bLiked = b.isLiked === 'true';
      
      if (aLiked && !bLiked) return -1;
      if (!aLiked && bLiked) return 1;
      return a.name.localeCompare(b.name);
    }).filter((recipe) => {
      if (!homeScreen) {
        return recipe.category === categoryContext;
      } else {
        return true;
      }}
      ).filter((recipe) => {
        if (searchText !== '') {
          return recipe.name.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
      });

    useEffect(() => {
      recipes = databaseService.getAllRecipes();
      sortedRecipe = [...recipes].sort((a, b) => { 
        const aLiked = a.isLiked === 'true';
        const bLiked = b.isLiked === 'true';
        
        if (aLiked && !bLiked) return -1;
        if (!aLiked && bLiked) return 1;
        return a.name.localeCompare(b.name);
    }).filter((recipe) => {
      if (!homeScreen) {
        return recipe.category === categoryContext;
      } else {
        return true;
      }}
      ).filter((recipe) => {
        if (searchText !== '') {
          return recipe.name.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
      });

    }, [dBChangedContext, likeContext]);
    

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => setSearch(!search)}>
            <Image source={require('../assets/appIcons/search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        ),
      });
    }, []);
    

    const [addNewRecipe, setAddNewRecipe] = useState(false);

    function setNewRecipe() {
        setAddNewRecipe(!addNewRecipe);
    }
    
    useEffect(() => {
      if (homeScreen) {
        navigation.setOptions({
          title: 'All Recipes'
        });
      } else {
        navigation.setOptions({
          title: categoryContext
        });
      }
      if (addNewRecipe) {
        recipes = databaseService.getAllRecipes();
        setShowSavedModal(true);
      }
    }, [categoryContext]);



    const handlePress = () => {
        navigation.navigate('Edit Recipe',{ recipeList: true, newAdded: setNewRecipe});
    }

    const handleClose = () => {
      setSearch(!setSearch);
      setSearchText('');
      if (homeScreen) {
        navigation.navigate('Home');
      }
    }


    return (
        <View style={styles.containerView}> 
        <FeedBack visible={showSavedModal} onClose={()=> setShowSavedModal(false)}/>
        {search && (
          <View style={styles.searchContainer}>
            <TextInput	placeholder="Search" style={styles.search} onChangeText={(text) => setSearchText(text)} />
            <TouchableOpacity onPress={handleClose} style={styles.pressButton}>
              <Image style={styles.exit} source={require('../assets/appIcons/x.png')} />
            </TouchableOpacity>
              </View>)}
                  <FlatList data={sortedRecipe}
                      renderItem={({ item }) => (<RecipeListItem recipe={item} navigation={navigation} />)}
                  keyExtractor={(item) => key++}/>
            <View style={styles.button}>
              <TouchableOpacity onPress={handlePress}>
                <Image source={require('../assets/appIcons/plus.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
        </View>
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
      searchIcon:
      {
        width: 40,
        height: 40,	
        margin: 20,
      },
      search: {
        width: '80%',
        height: 50,
        margin: 10,
        fontSize: 20,
      },
      exit: {
        width: 30,
        height: 30,
      },
      searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.text,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 20,
        width: '90%',
      },
      pressButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }
});