import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
//import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, Button, Alert, Dimensions } from 'react-native';

const UserComments = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const { userdata } = useUser();
  
   
  const handleCommentChange = (text) => {
    // Check if the input doesn't exceed 4000 characters
    if (text.length <= 4000) {
      setComment(text);
    } else {
      Alert.alert('Character Limit Exceeded', 'The comment cannot exceed 4000 characters.');
    }
  };

  const handleClose = () => {
    // Clear the comment input    
    setComment('');
    navigation.navigate('Dashboard');
  };

  const [uID] = userdata.userID;
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
        const response = await fetch('http://192.168.1.22:5137/api/UserComments/PostUserComments', {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify(postuserComment),
    });    
    const userComment = await response.json();
   
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }        
        Alert.alert('Comment Submitted : '+ userComment.comments);         
        setComment('');      
      } catch (error) {
        Alert.alert('API Error', 'An error occurred while submitting the comment.');
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
        placeholder="Enter your comment here...."
        multiline
        value={comment}
        onChangeText={handleCommentChange}
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Close" onPress={handleClose} />
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
    //maxHeight: 1600, // You can adjust the maximum height as needed
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserComments;
