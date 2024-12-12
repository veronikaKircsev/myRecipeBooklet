import React, {useState, useContext, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import {CategoryContext} from "../context/CategoryContextProvider";
import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';
import {DBChangedContext} from '../context/DBChangedContextProvider';
import FeedBack from '../components/Feedback';
import { getImageUri, getImageUriExportIngredients, getImageUriExportInstructions, getImageUriExportDish, resetImageUris, getImageUriExportNotice } from '../camera/Camera';
import DatabaseService2 from '../database_elements/SQLiteService';
import { CameraContext } from '../context/CameraContextProvider';

const databaseService = new DatabaseService();
const databaseService2 = new DatabaseService2();


export default EditRecipe = ({navigation, route}) => {
    
    const { categoryContext, setCategoryContext } = useContext(CategoryContext);
    const {dBChangedContext, setDBChangedContext} = useContext(DBChangedContext);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { cameraContext, setCameraContext } = useContext(CameraContext);
    const [completed, setCompleted] = useState(false);
    
    const categories = databaseService.getAllCategories();

    const [data, setData] = useState([
        ...categories.map(category => ({label: category.name, value: category.name})),
        {label: "+ Category", value: "add_category"}
      ]);

    const defaultData = {
        category: '',
        name: '',
        ingredients: '',
        instructions: '',
        notice: '',
        dish: '',
    }

    const {category, name, ingredients, instructions, notice, dish, newDish, newName, recipeList, newAdded, fromHome, newIngredients, newInstructions, newNotice} = route.params!==undefined? route.params: defaultData;
    const routeData = {
            category: category,
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            notice: notice,
            dish: dish,
    };

    const [formData, setFormData] = useState(routeData!==undefined? routeData: defaultData);

    useEffect(() => {
        if (formData.category === "+ Category") {
            navigation.navigate("Create Category", { createPage: true });
            setValue(null);
            setFormData({...formData, category: null});
        }
    }, [formData.category]);

    useEffect(() => {
            let ingredientsUri = getImageUriExportIngredients();
            let instructionsUri = getImageUriExportInstructions();
            let noticeUri = getImageUriExportNotice();
            let dishUri = getImageUriExportDish();

            if (ingredientsUri !== null) {
                setFormData({...formData, ingredients: ingredientsUri});
            }
            if (instructionsUri !== null) {
                setFormData({...formData, instructions: instructionsUri});
            }
            if (noticeUri !== null) {
                setFormData({...formData, notice: noticeUri});
            }

            if (dishUri!== null) {
                setFormData({...formData, dish: dishUri});
            }
            
    }, [cameraContext]);

   const handleSubmit = () => {
    if (formData.category === '' || formData.name === ''){
        setCompleted(true);
        return;
    }
    if (routeData !== undefined) {
        if (recipeList) {
            databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
            newAdded();
        } else if (fromHome){
            
            databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice, formData.dishUri);
        } else {
            newName(formData.name);
            newIngredients(formData.ingredients);
            newInstructions(formData.instructions);
            newNotice(formData.notice);
            databaseService.updateRecipe(routeData.name, formData.name, formData.category, formData.ingredients, formData.instructions, formData.notice);
            setCategoryContext(formData.category);
            }
        } else {
            databaseService.createRecipe(formData.category, formData.name, formData.ingredients, formData.instructions, formData.notice);
        }

        resetImageUris();
        setDBChangedContext(!dBChangedContext);
        setFormData(defaultData);
        setValue(null);
        navigation.goBack();
    };

    const something = async () => {
        const recipes = await databaseService2.getAllRecipes();
        console.log(recipes);
    }
    
    const [value, setValue] = useState(routeData!==undefined? routeData.category: categoryContext);

  useEffect(() => {
    const addedCategory = databaseService.getAllCategories();
    setData([
        ...addedCategory.map(category => ({label: category.name, value: category.name})),
        {label: "+ Category", value: "add_category"}
        ]);
        setFormData({...formData, category: categoryContext});
        setValue(categoryContext);
        if(showModal){
        setShowSavedModal(true);
        }else{
        setShowModal(false);
        }
    }, [dBChangedContext]);

    return (
        <ScrollView>
        <View style={styles.containerView}> 
            <FeedBack visible={showSavedModal} onClose={()=> setShowSavedModal(false)}/>
                {completed && <Text style={styles.text}>Please fill out the form</Text>}
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
                        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera', {source: 'ingredients'})} >
                        <Image source={require('../assets/appIcons/camera2.png')} style={styles.camera} />
                        </TouchableOpacity>
                    </View>
                    {(formData.ingredients && formData.ingredients.startsWith("file://")) ? <Image source={{uri: formData.ingredients}} style={{width: 200, height: 300}} /> :
                        <TextInput style={styles.ingredientsField} multiline={true} textAlignVertical="top" placeholder="Ingredients"
                            onChangeText={(text) => setFormData({...formData, ingredients: text})}
                            value={formData.ingredients}
                        />
                        }
                </View>
                <View style={styles.instructions}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Instructions</Text>
                        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera', {source: 'instructions'})} >
                            <Image source={require('../assets/appIcons/camera2.png')} style={styles.camera} />
                        </TouchableOpacity>
                    </View>
                    {(formData.instructions && formData.instructions.startsWith("file://")) ? <Image source={{uri: formData.instructions}} style={{width: 200, height: 300}} /> :
                    <TextInput style={styles.instructionsField} multiline={true} textAlignVertical="top" placeholder="Instructions"
                        onChangeText={(text) => setFormData({...formData, instructions: text})}
                        value={formData.instructions}
                    />}
                </View>
                <View style={styles.notice}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Notice</Text>
                        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera', {source: 'notice'})} >
                        <Image source={require('../assets/appIcons/camera2.png')} style={styles.camera} />
                        </TouchableOpacity>
                    </View>
                    {(formData.notice && formData.notice.startsWith("file://")) ? <Image source={{uri: formData.notice}} style={{width: 100, height: 100}} /> :
                    <TextInput style={styles.noticeField} multiline={true} textAlignVertical="top"
                        placeholder="Notice"
                        onChangeText={(text) => setFormData({...formData, notice: text})}
                        value={formData.notice}
                    />}
                </View>
                <View style={styles.notice}>
                {(formData.dish && formData.dish.startsWith("file://")) && <Image source={{uri: formData.dish}} style={{width: 100, height: 100}} />}
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera', {source: 'dish'})} >
                        <Text style={styles.text}>Add Photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        height: '100%',	
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
        padding: 10,
        height: 60,
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
        height: 200,	
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
        height: 200,	
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
        height: 100,	
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        borderRadius: 50,
        borderColor: colors.text,
        borderStyle: 'solid',
        borderWidth: 2,
        width: '40%',
        height: 50,
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
        },
        camera: {
            width: 30,
            height: 30,
            margin: 10
        },
        cameraButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 10,
        }
      
    
});