import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const UnderConstructionPage = () => {
  const {t} = useTranslation();
  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>{t("We're Working on It !")}</Text>
      <View style={styles.gifContainer}>
        <Image
          source={require('../assets/icons/comingsoon.gif')}
          style={styles.gif}
        />
        <Image
          source={require('../assets/icons/staytuned.gif')}
          style={styles.gif}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#000000'
  },
  gifContainer: {
    flexDirection: 'column', 
    alignItems: 'center', 
  },
  gif: {
    width: 300,
    height: 150,
    marginVertical: 10,
  },
});

export default UnderConstructionPage;
