import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const CustomAlertPlaningEnforcementMsg = ({ visible, onClose }) => {
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err));
    };

    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropTransitionOutTiming={0}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            {/* Semi-Transparent Background */}
            <View style={styles.background} />

            {/* Modal Content */}
            <View style={styles.modalContent}>
                <Text style={styles.title}>
                Now that you're aware of the impact of saturated fat, are there any healthier substitutions you could have considered for your lunch to reduce your saturated fat intake?
                </Text>
                <Image source={require('../assets/icons/thumbsup.png')} style={[styles.icon]}></Image>
                
                <Button
                    title="Close"
                    buttonStyle={styles.button}
                    onPress={onClose}
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
        color: '#000000'
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#CD5C5C'
    },
    icon: {
        width: 230,
        height: 140,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'red',
        marginTop: 10,
    },
});

export default CustomAlertPlaningEnforcementMsg;
