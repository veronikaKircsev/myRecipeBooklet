import React, {useContext} from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { colors } from "../Color";
import {CategoryContext} from "../context/CategoryContextProvider";


export const CategoryItem = ({url, name, navigation}) => {

  const { categoryContext, setCategoryContext } = useContext(CategoryContext);
  
  const handlePress = () => {
    setCategoryContext(name);
    navigation.navigate('Recipies')
  }

    return (
        <TouchableOpacity style={styles.button}
        onPress={handlePress}> 
                  <View> 
                  <Image source={ImageList.find(item => item.id === url).url} style={styles.image}/>
                  <Text style={styles.text}>{name}</Text>
                  </View> 
        </TouchableOpacity> 
    );
};

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: 20,
      margin: 15,
      width: 120,
      padding: 15,
      width: 140,
      height  : 140,
    },
    image: {
      width: 100,
      height: 100,

    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
  });

  export const ImageList = [
    { id: '1', 'url': require('../assets/categoryIcons/soup.png') },
    { id: '2', 'url': require('../assets/categoryIcons/mainCourse.png') },
    { id: '3', 'url': require('../assets/categoryIcons/mignons.png') },
    { id: '4', 'url': require('../assets/categoryIcons/notes.png') },
    { id: '5', 'url': require('../assets/categoryIcons/2.png') },
    { id: '6', 'url': require('../assets/categoryIcons/3.png') },
    { id: '7', 'url': require('../assets/categoryIcons/4.png') },
    { id: '8', 'url': require('../assets/categoryIcons/5.png') },
    { id: '9', 'url': require('../assets/categoryIcons/6.png') },
    { id: '10', 'url': require('../assets/categoryIcons/7.png') },
    { id: '11', 'url': require('../assets/categoryIcons/8.png') },
    { id: '12', 'url': require('../assets/categoryIcons/9.png') },
    { id: '13', 'url': require('../assets/categoryIcons/10.png') },
    { id: '14', 'url': require('../assets/categoryIcons/11.png') },
    { id: '15', 'url': require('../assets/categoryIcons/12.png') },
    { id: '16', 'url': require('../assets/categoryIcons/13.png') },
    { id: '17', 'url': require('../assets/categoryIcons/14.png') },
    { id: '18', 'url': require('../assets/categoryIcons/15.png') },
    { id: '19', 'url': require('../assets/categoryIcons/16.png') },
    { id: '20', 'url': require('../assets/categoryIcons/17.png') },
    { id: '22', 'url': require('../assets/categoryIcons/19.png') },
    { id: '23', 'url': require('../assets/categoryIcons/20.png') },
    { id: '24', 'url': require('../assets/categoryIcons/21.png') },
    { id: '25', 'url': require('../assets/categoryIcons/22.png') },
    { id: '26', 'url': require('../assets/categoryIcons/23.png') },
    { id: '27', 'url': require('../assets/categoryIcons/24.png') },
    { id: '28', 'url': require('../assets/categoryIcons/25.png') },
    { id: '29', 'url': require('../assets/categoryIcons/26.png') },
    { id: '30', 'url': require('../assets/categoryIcons/27.png') },
    { id: '31', 'url': require('../assets/categoryIcons/28.png') },
    { id: '32', 'url': require('../assets/categoryIcons/29.png') },
    { id: '33', 'url': require('../assets/categoryIcons/30.png') },
    { id: '34', 'url': require('../assets/categoryIcons/31.png') },
    { id: '35', 'url': require('../assets/categoryIcons/32.png') },
    { id: '36', 'url': require('../assets/categoryIcons/33.png') },
    { id: '37', 'url': require('../assets/categoryIcons/34.png') },
    { id: '38', 'url': require('../assets/categoryIcons/35.png') },
    { id: '39', 'url': require('../assets/categoryIcons/36.png') },
    { id: '40', 'url': require('../assets/categoryIcons/37.png') },
    { id: '41', 'url': require('../assets/categoryIcons/38.png') },
    { id: '42', 'url': require('../assets/categoryIcons/39.png') },
    { id: '43', 'url': require('../assets/categoryIcons/40.png') },
    { id: '45', 'url': require('../assets/categoryIcons/42.png') },
    { id: '46', 'url': require('../assets/categoryIcons/43.png') },
  
];
