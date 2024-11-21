import React, {useState} from 'react'
import {View, Text, Button, StyleSheet, TextInput} from 'react-native'

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
    console.log(formData);
  };


    return (
        <View style={styles.containerView}> 
            <TextInput
        placeholder="Category Name"
        onChangeText={(text) => setFormData({...formData, name: text})}
        />
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setFormData({...formData, name: text})}
      />
      <TextInput
        placeholder="Ingredients"
        onChangeText={(text) => setFormData({...formData, name: text})}
      />
      <TextInput
        placeholder="Instructions"
        onChangeText={(text) => setFormData({...formData, name: text})}
      />
      <TextInput
        placeholder="Notice"
        onChangeText={(text) => setFormData({...formData, name: text})}
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