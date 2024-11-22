import React, {useState} from 'react'
import {View, Text, Button, StyleSheet, TextInput} from 'react-native'
import DatabaseService from './DatabaseService';

const databaseService = new DatabaseService();


export default RecipeList = ({navigation, route}) => {

    const [formData, setFormData] = useState({
        category: '',
        name: '',
        ingredients: '',
        instructions: '',
        notice: ''
      });
    
   const goBack = () => {
        navigation.navigate("Home");
   }

   const handleSubmit = () => {
    // console.log(formData);
    
    // databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
    // databaseService.createRecipe('category 2', 'name 2', 'ingredients 2', 'instructions 2', 'notice 2');
    // databaseService.createRecipe('category 3', 'name 3', 'ingredients 3', 'instructions 3', 'notice 3');

    // console.log(databaseService.getRecipe('cake'));
    // console.log(databaseService.getAllRecipes());

    // databaseService.createCategory('Salad', 'salad/url');
    // databaseService.createCategory('Dessert', 'dessert/url');
    // databaseService.createCategory('MainDish', 'mainDish/url');

    // console.log(databaseService.getCategory('Dessert'));
    // console.log(databaseService.getAllCategories());
  };

 


    return (
        <View style={styles.containerView}> 
            <TextInput
        placeholder="Category Name"
        onChangeText={(text) => setFormData({...formData, category: text})}
        />
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setFormData({...formData, name: text})}
      />
      <TextInput
        placeholder="Ingredients"
        onChangeText={(text) => setFormData({...formData, ingredients: text})}
      />
      <TextInput
        placeholder="Instructions"
        onChangeText={(text) => setFormData({...formData, instructions: text})}
      />
      <TextInput
        placeholder="Notice"
        onChangeText={(text) => setFormData({...formData, notice: text})}
      />
       <Button title="Submit" onPress={handleSubmit} />

        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});