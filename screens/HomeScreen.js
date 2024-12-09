import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, FlatList, Modal } from 'react-native';

import CategoryItem from '../components/CategoryItem';
import PopupExample from '../components/PopUp';
import { colors } from '../Color';

import CameraScreen from '../camera/CameraScreen.js';

import DatabaseService from '../database_elements/DatabaseService';

const databaseService = new DatabaseService();
databaseService.initializeDefaultCategories();

databaseService.initRecipies();

let key = 0;



export default HomeScreen = ({ navigation }) => {

  const [cameraVisible, setCameraVisible] = useState(false);
  
  const categories = databaseService.getAllCategories();
  console.log(categories);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerView}> 
            {categories.map((defaultCategory) =>
                <CategoryItem key={key++} url={defaultCategory.url} name={defaultCategory.name} navigation={navigation}/>
                )}
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => togglePopup()}>
            <Image source={require('../assets/appIcons/plus.png')} style={styles.image} />
            <PopupExample isVisible={isPopupVisible} toggle={togglePopup} navigation={navigation} />
            </TouchableOpacity>
            </View>

            {/* <Button title="Open Camera" onPress={() => setCameraVisible(true)} />
            <Modal visible={cameraVisible} animationType="slide">
                <CameraScreen />
                <Button title="Close Camera" onPress={() => setCameraVisible(false)} />
            </Modal> */}

            {/* <Button 
              title="Open Camera" 
              onPress={() => navigation.navigate('Camera')} 
            /> */}

        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerView: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          marginTop: 20,
          paddingHorizontal: 5,
          paddingVertical: 5,
        },
        text: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          color: colors.text,
        },
        image: {
          width: 70,
          height: 70,
        },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
          borderRadius: 50,
          margin: 20,
          width: 100,
          height: 100,
        },
      });