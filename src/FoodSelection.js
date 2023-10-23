import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import BASE_URL from './apiConfig';

const FoodSelection = () => {
  const navigation = useNavigation();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch food details from the API and set both originalData and data
   // axios
     //const response = await fetch(`${BASE_URL}/FoodDetails/GetAllFoodDetails`, {
      
      axios.get(`${BASE_URL}/FoodDetails/GetAllFoodDetails`)
      .then((response) => {
        setOriginalData(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const handleLinkClick = (foodItem) => {
    navigation.navigate('FoodDetailsPage', {  foodDetails: foodItem }); // Pass the food item as props
  };
  
  const handleAddFoodItemClick = () => {
    navigation.navigate('AddFoodItemScreen', { allFoodItems: originalData });
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = originalData.filter((item) =>
      item.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setData(originalData); // Reset data to originalData when clearing the search
  };

  const renderItem = ({ item }) => (
    <ListItem containerStyle={styles.listItemContainer}>
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle}>{item.foodName}</ListItem.Title>
      </ListItem.Content>
      <TouchableOpacity onPress={() => handleLinkClick(item)}>
        <Image source={require('../assets/icons/arrow.png')} style={{ width: 25, height: 20 }} />
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Food"
        placeholderTextColor="#888"
        backgroundColor="white"
        value={searchQuery}
        onChangeText={handleSearch}
        // Add more styling properties as needed
      />
      {searchQuery.length > 0 && ( // Render Clear button if searchQuery is not empty
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity onPress={handleAddFoodItemClick} style={styles.linkButton}>
        <Text style={styles.linkText}>Can't find food? Add your new dish here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgrey',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 5,
  },
  clearButton: {
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  clearButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  listItemContainer: {
    marginBottom: 10,
    borderRadius: 5,
  },
  listItemTitle: {
    fontSize: 18,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
    fontSize: 18,
    fontFamily: 'BrushScriptMT, cursive',
    marginBottom: 10,
  },
});

export default FoodSelection;
