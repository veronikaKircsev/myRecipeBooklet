import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

const CategoryIcon= ({icon, onPress, setId}) => {

    const setCategoryId = () => {
        onPress(icon);
    }

       return (
        <TouchableOpacity style={setId===icon.id?styles.pressed:styles.button} onPress={setCategoryId}> 
                  <View> 
                  <Image source={icon.url} style={styles.image}/>
                  </View> 
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    button: {
        width: 90,
        height: 90,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    pressed: {
        width: 90,
        height: 90,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
});

export default CategoryIcon;

