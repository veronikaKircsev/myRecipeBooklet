import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';
import DatabaseService2 from '../database_elements/SQLiteService';
import * as FileSystem from 'expo-file-system';

import { getImageUri, getImageUriExportIngredients, getImageUriExportInstructions, getImageUriExportDish, resetImageUris } from '../camera/CameraTest';
import * as SQLite from 'expo-sqlite';
import { createStore } from 'tinybase';

const databaseService = new DatabaseService();



const databaseService2 = new DatabaseService2();
// await databaseService2.initDatabase();
const categories = databaseService.getAllCategories();
const data = categories.map(category => ({label: category.name, value: category.name}));


export default RecipeList = ({navigation, route}) => {

    // console.log(databaseService.getAllRecipes());

   
      
    const defaultData = {
        category: 'category test',
        name: 'name test',
        ingredients: 'ingredients test',
        instructions: 'instructions test',
        notice: 'notice test'
    }

    const [formData, setFormData] = useState(defaultData);

    
   const goBack = () => {
        navigation.navigate("Home");
   }

   const handleSubmit = () => {

    // databaseService2.insertTest('newValue', 999).then(newId => {
    //     console.log('New entry ID:', newId);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });



    const ingredientsUri = getImageUriExportIngredients();
    const instructionsUri = getImageUriExportInstructions();
    const dishUri = getImageUriExportDish();

    if(ingredientsUri !== null) {
        formData.ingredients = ingredientsUri;
    }
    if(instructionsUri !== null) {
        formData.instructions = instructionsUri;
    }
   

    databaseService2.insertRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice, dishUri).then(newId => {
        console.log('New entry ID:', newId);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    // console.log(formData);
    // databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);

    // console.log(JSON.stringify(databaseService.getAllRecipes(), null, 2));

    if(ingredientsUri !== null) {
        formData.ingredients = ingredientsUri;
    }
    if(instructionsUri !== null) {
        formData.instructions = instructionsUri;
    }
    // if(dishUri  
    databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice, dishUri);
    resetImageUris();

    // console.log("test1: " + ingredientsUri + " test2: " + instructionsUri + " test3: " + dishUri);

    // after submission process, reset the form
    setFormData(defaultData);
    setValue(null);
  };

  const handleSubmitDelete = async () => {

    const allTests = await databaseService2.getAllRecipes();
    console.log('All rows:', allTests);

    const firstTest = await databaseService2.getFirstRecipe();
    console.log('First row:', firstTest);

    
    // console.log(JSON.stringify(databaseService.getAllRecipes(), null, 2));

        

    // databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
    // after submission process, reset the form
    // setFormData(defaultData);
    // setValue(null);
  };
  
  async function savePhotoAsync(imageUri, fileName) {
    const fileUri = FileSystem.documentDirectory +  fileName + '.jpg';

    console.log("savePhotoAsync(): ", fileUri);

    try {
        await FileSystem.copyAsync({
          from: imageUri,
          to: fileUri,
        });
        console.log('Photo saved in the File System successfully');
    } catch (error) {
        console.error('Error while saving photo:', error);
    }
  };

  const [value, setValue] = useState(null);

    return (
        <View style={styles.containerView}> 
            <View style={styles.category}> 
                <Text style={styles.text}>Category</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.textStyle}
                        itemContainerStyle={styles.itemContainerStyle}
                        containerStyle={styles.dropdownContainer}
                        data={data}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Category..."
                        value={value}
                        onChange={item => {
                        setValue(item.value);
                        setFormData({...formData, category: item.label})
                        }}
                    />
            </View>
            <View style={styles.name}>
                <Text style={styles.text}>Name</Text>
                <TextInput style={styles.inputNameField}
                    placeholder="Name"
                    onChangeText={(text) => setFormData({...formData, name: text})}
                    value={formData.name}
                />
            </View>
            <View style={styles.ingredients}>
                <View style={styles.row}>
                    <Text style={styles.text}>Ingredients</Text>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera', {source: 'ingredients'})} >
                        <Text style={styles.text}>Camera</Text>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.ingredientsField} multiline={true} textAlignVertical="top"
                numberOfLines={10} placeholder="Ingredients"
                    onChangeText={(text) => setFormData({...formData, ingredients: text})}
                    value={formData.ingredients}
                />
            </View>
            <View style={styles.instructions}>
            <View style={styles.row}>

                <Text style={styles.text}>Instructions</Text>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera', {source: 'instructions'})} >
                    <Text style={styles.text}>Camera</Text>
                </TouchableOpacity>
            </View>
                <TextInput style={styles.instructionsField} multiline={true} textAlignVertical="top"
                numberOfLines={10} placeholder="Instructions"
                    onChangeText={(text) => setFormData({...formData, instructions: text})}
                    value={formData.instructions}
                />
            </View>
            <View style={styles.notice}>
                <Text style={styles.text}>Notice</Text>
                <TextInput style={styles.noticeField} multiline={true} textAlignVertical="top"
                    placeholder="Notice"
                    onChangeText={(text) => setFormData({...formData, notice: text})}
                    value={formData.notice}
                />
            </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera', {source: 'dish'})} >
                    <Text style={styles.text}>Camera</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmitDelete}>
                    <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 20,
        gap: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text
    },
    category: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 10,
    },
    inputCategoryField: {
        width: '60%',
        height: '90%',	
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    name: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 10
    },
    inputNameField: {
        width: '70%',
        height: '90%',	
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    ingredients: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'left',
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 10,
    },
    ingredientsField: {
        height: '75%',	
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    instructions: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'left',
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 10,
    },
    instructionsField: {
        height: '80%',	
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
    },
    notice: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'left',
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 20,
    },
    noticeField: {
        height: '60%',	
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        borderRadius: 50,
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        width: '50%',
    },
    dropdown: {
        width: '60%',
        height: '100%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      },
      placeholderStyle: {
        fontSize: 18,
        color: colors.text
      },
        selectedTextStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
        },
        textStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.text
        },
        itemContainerStyle: {
            borderRadius: 10,
            margin: 10,
            backgroundColor: colors.background,
        },
        dropdownContainer: {
            height: '100%',
            borderColor: colors.text,
            borderStyle: 'solid',
            borderWidth: 2,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: 'white',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
});