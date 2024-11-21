import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import { colors } from "../Color";

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
      backgroundColor: colors.background,
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
      color: colors.text,
    },
  });

  export default CategoryItem;