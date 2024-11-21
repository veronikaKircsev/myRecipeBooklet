import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

const CategoryItem = ({url, name, navigation}) => {
    return (
        <TouchableOpacity style={styles.button}
        onPress={() => {navigation.navigate('Recipies')}}> 
                  <View> 
                  <Image source={url} style={styles.image}/>
                  <Text style={styles.text}>{name}</Text>
                  </View> 
        </TouchableOpacity> 
    );
};

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EEE3CB',
      borderRadius: 20,
      margin: 15,
      width: 120,
      padding: 15,
    },
    image: {
      width: 100,
      height: 100,

    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#65647C',
    },
  });

  export default CategoryItem;