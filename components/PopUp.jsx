import React, {useContext} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../Color';
import {CategoryContext} from "../context/CategoryContextProvider";

const PopupExample = ({isVisible, toggle, navigation}) => {

  const { categoryContext, setCategoryContext } = useContext(CategoryContext);

    const handlePressRecipe = () => {
      setCategoryContext('');
        navigation.navigate('Edit Recipe', {fromHome: true});
        toggle();
      };
    const handlePressCategory = () => {
        navigation.navigate('Create Category');
        toggle();
    };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggle}
    >
      <TouchableWithoutFeedback onPress={toggle}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handlePressRecipe}
              >
                <Text style={styles.textStyle}>Create Recipe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handlePressCategory}
              >
                <Text style={styles.textStyle}>Create Category</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  openButton: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    height: 150,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: colors.background,
    width: '40%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
  },
});

export default PopupExample;
