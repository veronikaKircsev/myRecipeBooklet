import React, {useState} from 'react'
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

import { colors } from '../Color';

export default RecipeList = ({navigation, route}) => {

    const defaultData = {
        category: '',
        name: '',
        ingredients: '',
        instructions: '',
        notice: ''
    }

    const [formData, setFormData] = useState(defaultData);

    
   const goBack = () => {
        navigation.navigate("Home");
   }

   const handleSubmit = () => {
    console.log(formData);
    setFormData(defaultData);
  };


    return (
        <View style={styles.containerView}> 
            <View style={styles.category}> 
                <Text style={styles.text}>Category</Text>
                <TextInput style={styles.inputCategoryField}
                placeholder="Category"
                onChangeText={(text) => setFormData({...formData, category: text})}
                value={formData.category}
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
    
});