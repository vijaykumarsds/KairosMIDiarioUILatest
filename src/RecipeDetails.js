import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const RecipeDetails = ({ route }) => {
  const { ingredients, description, name } = route.params;
  const navigation = useNavigation();
  
  const handleok = ()=>{
    navigation.navigate('Recipe Selection');

  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box1}>
        <Text style={styles.heading1}>{name}</Text>
        </View>
        {/* Ingredients Box */}
        <View style={styles.box}>
          <Text style={styles.heading}>Ingredients:</Text>
          <Text style={styles.description}>{ingredients}</Text>
        </View>

        {/* Directions Box */}
        <View style={styles.box}>
          <Text style={styles.heading}>Directions:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity onPress={handleok} style={styles.button}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    borderRadius: 100,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#33bbff',
  },
 buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
  },
  heading1: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  heading1: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 19,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    color: '#000000',
    fontSize: 17,
  },
  box: {
    backgroundColor: '#f2ffcc', 
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  box1: {
    backgroundColor: '#99ddff', 
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
});

export default RecipeDetails;
