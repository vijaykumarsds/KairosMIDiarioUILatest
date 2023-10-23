import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import BASE_URL from './apiConfig';
import { useUser } from './UserContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';


const FoodDetailsPage = () => {
  const { userdata } = useUser();
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [nutrients, setNutrients] = useState({
    Calories: '',
    Fat: '',
    Protein: '',
    Carbohydrates: '',
    Fiber: '',
    Glucose: '',
    Water: '',
  });
  const [fetchedFoodNames, setFetchedFoodNames] = useState([]);
  const [isFoodNameValid, setIsFoodNameValid] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {

    axios
      .get(`${BASE_URL}/FoodDetails/GetAllFoodDetails`)
      .then((response) => {

        const names = response.data.map((foodItem) => foodItem.foodName.toLowerCase());
        setFetchedFoodNames(names);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const validateFoodName = (text) => {
    const lowercaseText = text.toLowerCase();
    const isDuplicate = fetchedFoodNames.includes(lowercaseText);
    setIsFoodNameValid(!isDuplicate);
    setFoodName(text);
  };


  const handleImageUpload = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log('User canceled the upload', err);
      else console.log(err);
    }


  };

  const handleSubmit = () => {

    const nutrientsString = Object.keys(nutrients)
      .map((key) => `${key}: ${nutrients[key]}`)
      .join(', ');
    const formattedNutrition =
      `Calories(kcals): ${nutrients.Calories},
      Protein(grams): ${nutrients.Protein},
      Fat(grams): ${nutrients.Fat},
      Carbohydrates(grams): ${nutrients.Carbohydrates},
      Fiber(grams): ${nutrients.Fiber},
      Sugar(grams): ${nutrients.Glucose},
      Water(%): ${nutrients.Water}`;
    const numericID = userdata.userID.replace(/\D/g, '');
    const foodData = {
      userId: numericID,
      foodName,
      foodDescription: description,
      foodNutrition: formattedNutrition,
    };

    console.log(foodData);

    axios
      .post(`${BASE_URL}/UserFoodDetails/InsertUserFoodDetails`, foodData)
      .then((response) => {
        setShowSuccessAlert(true);

      })

      .catch((error) => {
        // Handle error
        console.error('Error updating food details:', error);
      });
  };

  return (
    <ScrollView>
      <Button title="Upload Food Image" onPress={handleImageUpload} />
      {/* Input fields */}
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Food Name</Text>
        <TextInput
          style={[
            styles.input,
            !isFoodNameValid && styles.invalidInput,
          ]}
          placeholder="Enter Food Name"
          value={foodName}
          onChangeText={(text) => validateFoodName(text)}
          maxLength={200}
        />
        {!isFoodNameValid && (
          <Text style={styles.errorText}>A food with this name already exists.</Text>
        )}
      </View>
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          maxLength={2000}
        />
      </View>
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Nutrients</Text>


        <TextInput
          style={styles.input}
          placeholder="Enter Calories(kcals)"
          value={nutrients.Calories}
          onChangeText={(text) => setNutrients({ ...nutrients, Calories: text })}
          keyboardType="numeric"
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Fat(grams)"
          value={nutrients.Fat}
          onChangeText={(text) => setNutrients({ ...nutrients, Fat: text })}
          keyboardType="numeric"
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Protein(grams)"
          value={nutrients.Protein}
          onChangeText={(text) => setNutrients({ ...nutrients, Protein: text })}
          keyboardType="numeric"
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          placeholder="Water(%)"
          value={nutrients.Water}
          onChangeText={(text) => setNutrients({ ...nutrients, Water: text })}
          keyboardType="numeric"
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Carbohydrates(grams)"
          value={nutrients.Carbohydrates}
          onChangeText={(text) => setNutrients({ ...nutrients, Carbohydrates: text })}
          keyboardType="numeric"
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          placeholder="Fiber(grams)"
          value={nutrients.Fiber}
          onChangeText={(text) => setNutrients({ ...nutrients, Fiber: text })}
          keyboardType="numeric"
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Glucose(grams)"
          value={nutrients.Glucose}
          onChangeText={(text) => setNutrients({ ...nutrients, Glucose: text })}
          keyboardType="numeric"
          maxLength={6}
        />

      </View>

      <Button title="Add Food" onPress={handleSubmit} />
      <AwesomeAlert
        show={showSuccessAlert}
        title="SUCCESS"
        message="New food added successfully"
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'green', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowSuccessAlert(false);
          navigation.navigate('FoodSelection');
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fieldset: {
    marginBottom: 20,
  },
  legend: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 5,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default FoodDetailsPage;
