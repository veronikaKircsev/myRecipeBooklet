import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, FlatList } from 'react-native';

import CategoryItem from '../components/CategoryItem';
import PopupExample from '../components/PopUp';
import { colors } from '../Color';

const defaultCategories = [
    { id: '1', name: 'Soup', url: require('../assets/categoryIcons/soup.png') },
    { id: '2', name: 'Main Dish', url: require('../assets/categoryIcons/mainCourse.png') },
    { id: '3', name: 'Dessert', url: require('../assets/categoryIcons/mignons.png') },
    { id: '4', name: 'Try Later', url: require('../assets/categoryIcons/notes.png') },
  ];

export default HomeScreen = ({ navigation }) => {

    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerView}> 
            {defaultCategories.map((defaultCategory) =>
                <CategoryItem key={defaultCategory.id} url={defaultCategory.url} name={defaultCategory.name} navigation={navigation}/>
                )}
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => togglePopup()}>
            <Image source={require('../assets/appIcons/plus.png')} style={styles.image} />
            <PopupExample isVisible={isPopupVisible} toggle={togglePopup} navigation={navigation} />
            </TouchableOpacity>
            </View>
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