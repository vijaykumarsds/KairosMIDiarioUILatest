import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import { StyleSheet, Text, View, TextInput, Button, Alert, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import BASE_URL from './apiConfig';

const UserComments = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const { userdata } = useUser();
  
   
  const handleCommentChange = (text) => {
    if (text.length <= 4000) {
      setComment(text);
    } else {
      Alert.alert(t('Character Limit Exceeded'), t('The comment cannot exceed 4000 characters.'));
    }
  };

  const handleClose = () => {    
    setComment('');
    navigation.navigate('Dash');
  };

  const numericID = userdata.userID.replace(/\D/g, '');
  
  const postuserComment = {
    comments: comment,
    reviews: "Null",
    userID: numericID , 
    createdDate : "2023-09-11T06:30:41.359Z"
  };
 
// Function to fetch additional user data from the API
const postUserComments = async () => {
    try {        
        const response = await fetch(`${BASE_URL}/UserComments/InsertUserComments`, {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify(postuserComment),
    });    
    const userComment = await response.json();
    console.log(userComment)
   
        if (!response.ok) {
            throw new Error(t('Network response was not ok'));
        }        
        Alert.alert(t('Comments Successfully Submitted.'));
        setComment('');
        navigation.navigate('Dashboard');
      } catch (error) {
        Alert.alert(t('API Error'), t('An error occurred while submitting the comment.'));
        console.error(error);
    }
};
const handleSubmit = () => {
  postUserComments();
};

  return (
    <View style={styles.container}>      
      <TextInput
        style={styles.textArea}
        placeholder={t('Enter your comment here....')} 
        multiline
        value={comment}
        onChangeText={handleCommentChange}
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Button title={t('Submit')} onPress={handleSubmit} />
        <Button title={t('Close')} onPress={handleClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginVertical: 16,
    height: 200,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserComments;