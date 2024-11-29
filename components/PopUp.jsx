import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../Color';

const PopupExample = ({isVisible, toggle, navigation}) => {

    const handlePress = () => {
        navigation.navigate('Edit Recipe');
        toggle();
      };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggle} // For Android back button
    >
      <TouchableWithoutFeedback onPress={toggle}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handlePress}
              >
                <Text style={styles.textStyle}>Create Recipe</Text>
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
    width: '90%',
    height: 100,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: colors.background,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
  },
});

export default PopupExample;
