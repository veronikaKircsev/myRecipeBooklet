import React, {useState, useContext} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';
import CategoryIcon from '../components/CategoryIcon';
import {DBChangedContext} from '../context/DBChangedContextProvider';
import {CategoryContext} from "../context/CategoryContextProvider";

const databaseService = new DatabaseService();

let key = 0;
let numColumns = 4;

export default CreateCategory = ({navigation, route}) => {

    const {dBChangedContext, setDBChangedContext} = useContext(DBChangedContext);
    const { categoryContext, setCategoryContext } = useContext(CategoryContext);

    const {createPage} = route.params!==undefined? route.params: false;

    const ImageList = databaseService.getCategoryIcons();

    const defaultData = {
        name: '',
        iconId: ''
    }

    const [formData, setFormData] = useState(defaultData);

    const setIcon = (icon) => {
        setFormData({...formData, iconId: icon.id});
    }

    const handleSubmit = () => {
        databaseService.createCategory(formData.name, formData.iconId);
        if(createPage){
            setCategoryContext(formData.name);
        }
        setDBChangedContext(!dBChangedContext);
        setFormData(defaultData);
        navigation.goBack();
    }

    return (
        <View style={styles.containerView}>
            <View style={styles.name}>
            <Text style={styles.text}>Name</Text>
            <TextInput style={styles.inputNameField}
                placeholder="Name"
                onChangeText={(text) => setFormData({...formData, name: text})}
                value={formData.name}
            />
            </View>
            <View style={styles.iconContainer}>
                <Text style={styles.text}>Choose Icon</Text>
                <View style={{flexDirection: 'row', height: '80%'}}>
                <FlatList data={ImageList} renderItem={({item}) => <CategoryIcon icon={item} onPress={setIcon} setId={formData.iconId}/>} numColumns={numColumns}
                keyExtractor={(item) => key++} />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.text}>Create</Text>
            </TouchableOpacity>
        </View>
    )
}

    const styles = StyleSheet.create({
        name: {
            marginBottom: 20,
            backgroundColor: colors.background,
            borderRadius: 20,
            padding: 10
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.text,
            padding: 10
        },
        inputNameField: {
            borderWidth: 1,
            borderColor: colors.light,
            paddingHorizontal: 10,
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: 'white',
            fontSize: 18,
            height: 40,
        },
        containerView: {
            flex: 1,
            padding: 20,
        },
        button: {
            backgroundColor: colors.background,
            padding: 5,
            borderRadius: 20,
            marginTop: 20,
            width: 100,
            borderColor: colors.text,
            borderWidth: 2,
        },
        iconContainer: {
            backgroundColor: colors.background,
            borderRadius: 20,
            height: '70%',
        }
    })