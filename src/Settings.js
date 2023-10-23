import {  Text, View, StyleSheet, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import { useTranslation } from 'react-i18next';


const Settings = () => {
  const {userdata} =useUser();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleImageClick = () => {   
    // Navigate to a new screen here
    navigation.navigate('Login'); // Replace 'YourScreenName' with the name of the screen you want to navigate to
  };
  return (
    <View style={ [styles.maincard, { flex: 1}]}>
      <Text style={styles.headertext}>{t('User Info')}</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>{t('User Name')}:</Text>
          <Text style={styles.value}>{userdata.userName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t('email')}:</Text>
          <Text style={styles.value}>{userdata.eMail}</Text>
        </View>
      </View>
      <Text style={styles.headertext}>{t('Client Info')}</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>{t('Client Name')}:</Text>
          <Text style={[styles.value, {color:'red', fontSize:18}]}>Kairos - Mi Diario</Text>
        </View>
          <Text style={styles.childText}>{t('About Us')}</Text>
          <Text style={styles.childText}>{t('Contact Us')}</Text>
      </View>
      <Text style={styles.headertext}>{t('App Info')}</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>{t('App Version')} :</Text>
          <Text style={styles.value}>1.0</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleImageClick}>
      <View style={{flexDirection:'row'}}>
      <Image source={require('../assets/icons/logout.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
        <Text>{t('Logout')}</Text>
        </View>
        </TouchableOpacity>
    </View>

  )
};


export default Settings;
const styles = StyleSheet.create({
  maincard:{
    backgroundColor: 'lightskyblue',   //'#FFFDD0',
    borderRadius: 8,
    padding: 10,
    margin: 0,
  },
card: {
  backgroundColor: 'lightgrey',
  borderRadius: 8,
  elevation: 2, // for Android
  shadowColor: '#000', // for iOS
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  padding: 40,
  margin: 10,
  margin:10,
},
label: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 0,
},
value: {
  fontSize: 16,
  marginBottom: 12,
  marginLeft: 10,
},
row: {
    flexDirection: 'row', // This makes text appear in a row format   
    marginLeft: -30  ,
    marginTop:-10,  
  },
  headertext: {
    fontSize: 22,
    color: 'green',
  },
  childText: {
    fontSize: 16,
    marginRight: 2,
    color: 'blue',
  },
});