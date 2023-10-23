import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const CustomAlertStrengthPraiseMsg = ({ visible, onNext }) => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err));
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      onBackdropPress={onNext}
      style={styles.modal}
    >
      {/* Semi-Transparent Background */}
      <View style={styles.background} />

      {/* Modal Content */}
      <View style={styles.modalContent}>
        <Text style={styles.title}>
          That's great! It sounds like you had something from every food group in your lunch.
        </Text>
        <Text style={styles.subtitle}>Way to go!</Text>
        <Image  source={require('../assets/icons/emoji.png')} style={[styles.icon]}></Image>
        <Button
          title="Next"
          buttonStyle={styles.button}
          onPress={onNext}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center', // Align the modal to the bottom
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000000'
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#CD5C5C'
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center'
},
  button: {
    backgroundColor: 'green',
    marginTop: 10,
  },
});

export default CustomAlertStrengthPraiseMsg;
