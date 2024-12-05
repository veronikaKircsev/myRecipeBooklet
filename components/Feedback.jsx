import React, { useEffect } from 'react';
import { Modal, View, Image, StyleSheet } from 'react-native';

const FeedBack = ({ visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <Image styles={styles.image} source={require('../assets/appIcons/ok.png')}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        opacity: 0.9
    },
    });

export default FeedBack;