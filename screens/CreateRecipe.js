import React, {useState, useContext} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import {CategoryContext} from "../context/CategoryContextProvider";
import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';

const databaseService = new DatabaseService();

const categories = databaseService.getAllCategories();

const data = categories.map(category => ({label: category.name, value: category.name}));

export default EditRecipe = ({navigation, route}) => {

    const { categoryContext, setCategoryContext } = useContext(CategoryContext);

    const defaultData = {
        category: '',
        name: '',
        ingredients: '',
        instructions: '',
        notice: ''
    }

    const {category, name, ingredients, instructions, notice, newName, previous, newAdded} = route.params!==undefined? route.params: defaultData;
    const routeData = {
            category: category,
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            notice: notice
    };
    

    const [formData, setFormData] = useState(routeData!==undefined? routeData: defaultData);

   const handleSubmit = () => {
    console.log(routeData);
    console.log(formData);
    if (routeData!==undefined) {
        if (previous) {
            databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
            newAdded();
        } else {
        newName(formData.name);
        databaseService.updateRecipe(routeData.name, formData.name, formData.category, formData.ingredients, formData.instructions, formData.notice);
        setCategoryContext(formData.category);
        navigation.goBack();
        }
    } else {
    databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
    }
    setFormData(defaultData);
    setValue(null);
  };

  const [value, setValue] = useState(routeData!==undefined? routeData.category: null);


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
                <TextInput style={styles.ingredientsField} multiline={true} textAlignVertical="top" placeholder="Ingredients"
                    onChangeText={(text) => setFormData({...formData, ingredients: text})}
                    value={formData.ingredients}
                />
            </View>
            <View style={styles.instructions}>
                <Text style={styles.text}>Instructions</Text>
                <TextInput style={styles.instructionsField} multiline={true} textAlignVertical="top" placeholder="Instructions"
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.text}>Save</Text>
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