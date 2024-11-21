import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

export default RecipeList = ({navigation, route}) => {
    
   const goBack = () => {
        navigation.navigate("Home");
   }

    return (
        <View style={styles.containerView}> 
            <Text>Welcome to RecipeList</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});