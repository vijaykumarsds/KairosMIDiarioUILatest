import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from './apiConfig';
import { ActivityIndicator } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeDetails from './RecipeDetails';
import { useTranslation } from 'react-i18next';

const Recipe = () => {

  const Stack = createStackNavigator();
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recipe Selection"
        component={RecipeList}
        options={{
          headerTitle:t("Recipe Selection"),
          headerStyle: {
            backgroundColor: '#99ddff',
          },
          headerTitleStyle: {
            color: '#000000',
          },
        }}
      />
      <Stack.Screen
        name="Recipe Details"
        component={RecipeDetails}
        options={{
          headerTitle:t("Recipe Details"),
          headerStyle: {
            backgroundColor: '#99ddff',
          },
          headerTitleStyle: {
            color: '#000000',
          },
        }}
      />


    </Stack.Navigator>
  );
};

const RecipeList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const { t } = useTranslation();
  useEffect(() => {
    // Make an API call to fetch the recipes when the component mounts
    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = originalData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setData(originalData); // Reset data to originalData when clearing the search
  };

  const fetchRecipes = async () => {
    try {
      // Make an API call here to get the recipes from your server
      const response = await fetch(`${BASE_URL}/Recipes/GetRecipes`);

      const recipes = await response.json();
      setData(recipes);
      setOriginalData(recipes); // Store the original data
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRecipeDetails = (item) => {
    navigation.navigate('Recipe Details', {
      ingredients: item.ingredients,
      description: item.description,
      name: item.name,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => navigateToRecipeDetails(item)}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Image
          source={require('../assets/icons/arrow.png')}
          style={styles.arrowIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t("Search Food")}
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

      {isLoading ? (
        <ActivityIndicator size="large" color="#33bbff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Recipe;

const styles = {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    color: 'black',
  },
  arrowContainer: {
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 25,
    height: 20,
  },
};