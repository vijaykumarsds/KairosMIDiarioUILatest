import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const CustomAlertExpertUserMsg = ({ visible, onNext1 }) => {
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err));
    };

    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropTransitionOutTiming={0}
            onBackdropPress={onNext1}
            style={styles.modal}
        >
            {/* Semi-Transparent Background */}
            <View style={styles.background} />

            {/* Modal Content */}
            <View style={styles.modalContent}>
                <Text style={styles.title}>
                Did you know that both diabetes and high levels of fats in your blood are risk factors for heart disease?
                </Text>
                <Image source={require('../assets/icons/sad.png')} style={[styles.icon]}></Image>
                <Text style={styles.subtitle}>(To learn more, <Text
                    style={styles.link}
                    onPress={() => openLink('https://www.cdc.gov/diabetes/library/features/diabetes-and-heart.html#:~:text=High%20blood%20pressure%20increases%20the,plaque%20on%20damaged%20artery%20walls.')}
                >
                    Click here
                </Text>)</Text>
                <Button
                    title="Next"
                    buttonStyle={styles.button}
                    onPress={onNext1}
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
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'green',
        marginTop: 10,
    },
});

export default CustomAlertExpertUserMsg;
