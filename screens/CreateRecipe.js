import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';
import * as FileSystem from 'expo-file-system';

import { getImageUri } from '../camera/CameraTest';

const databaseService = new DatabaseService();

const categories = databaseService.getAllCategories();

const data = categories.map(category => ({label: category.name, value: category.name}));

export default RecipeList = ({navigation, route}) => {

    console.log(databaseService.getAllRecipes());

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
    // console.log(formData);
    // databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);

    // databaseService.createRecipe('Fish', 'Test', 'some Ingredients', 'some instructions', 'some notice');
    // databaseService.createRecipe('Meat', 'Test2', 'some Ingredients2', 'some instructions2', 'some notice2');
    // databaseService.createRecipe('aaa', 'aaa', 'aaa', 'aaa', 'aaa');
    // databaseService.createRecipe('bbb', 'bbb', 'bbb', 'bbb', 'bbb');
    // databaseService.createRecipe('ddd', 'ddd', 'ddd', 'ddd', 'ddd');
    // databaseService.createRecipe('ccc', 'ccc', 'ccc', 'ccc', 'ccc');


    console.log(JSON.stringify(databaseService.getAllRecipes(), null, 2));

    // databaseService.createCategory('ddd', '4');
    // databaseService.createCategory('aaa', '1');
    // databaseService.createCategory('ccc', '3');
    // databaseService.createCategory('bbb', '2');

    // console.log(JSON.stringify(databaseService.getAllCategories(), null, 2));
    // console.log("databaseService.getCategory(): " + JSON.stringify(databaseService.getCategory('aaa')));


    const test = getImageUri();
    console.log("iamgeUriii: ", test);
    savePhotoAsync(test, formData.name);
    console.log("formData.name: ", formData.name);


    // after submission process, reset the form
    setFormData(defaultData);
    setValue(null);

    
  };

  const handleSubmitDelete = () => {

    // databaseService.updateRecipe('bbb', 'xxx', 'xxx', 'xxx', 'xxx');
    // databaseService.updateRecipe('bbb', { name: 'bbb', category: 'xxx', ingredients: 'xxx', instructions: 'xxx', notice: 'xxx' });
    databaseService.updateRecipe('bbb', { name: '', category: 'xxx', ingredients: 'xxx', instructions: '', notice: 'xxx' });


    console.log(JSON.stringify(databaseService.getAllRecipes(), null, 2));

    // databaseService.deleteCategory('aaa');
    // console.log(JSON.stringify(databaseService.getAllCategories(), null, 2));

    // databaseService.deleteRecipe('aaa');
    // console.log(databaseService.getAllRecipes);
    
    
    // console.log(formData);
    // databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
    // // after submission process, reset the form
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
                <Text style={styles.text}>Ingredients</Text>
                <TextInput style={styles.ingredientsField} multiline={true} textAlignVertical="top"
                numberOfLines={10} placeholder="Ingredients"
                    onChangeText={(text) => setFormData({...formData, ingredients: text})}
                    value={formData.ingredients}
                />
            </View>
            <View style={styles.instructions}>
                <Text style={styles.text}>Instructions</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')} >
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
      
    
});