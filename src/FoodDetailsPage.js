import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import CustomAlertPlaningEnforcementMsg from './CustomAlertPlaningEnforcementMsg';
import CustomAlertStrengthPraiseMsg from './CustomAlertStrengthPraiseMsg';
import CustomAlertExpertUserMsg from './CustomAlertExpertUserMsg'; // Import the new expert user alert component
import CustomAlertExpertUserConclusionMsg from './CustomAlertExpertUserConclusionMsg';
import axios from 'axios';
import BASE_URL from './apiConfig';

const foodImages = {
  'Chicken': require('../assets/images/chicken.png'),
  'Lamb': require('../assets/images/lamb.png'),
  'Pasta': require('../assets/images/pasta.png'),
  'Pork': require('../assets/images/pork.png'),
};

const FoodDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCustomAlertStrengthPraiseMsg, setShowCustomAlertStrengthPraiseMsg] = useState(false);
  const [showCustomAlertPlaningEnforcementMsg, setShowCustomAlertPlaningEnforcementMsg] = useState(false);
  const [showCustomAlertExpertUserMsg, setShowCustomAlertExpertUserMsg] = useState(false); 
  const [showCustomAlertExpertUserConclusionMsg, setShowCustomAlertExpertUserConclusionMsg] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { foodDetails } = route.params;
  const { userdata } = useUser();
  const userId = userdata.userID
  const formattedDate = new Date(userdata.createdDate);
  const currentDate = new Date;
  const diffInMilliseconds = currentDate - formattedDate;
  const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)); // Approximate number of days in a month
  
  console.log('Difference in months:', diffInMonths);
  
  const parseNutrition = (nutritionString) => {
    const nutritionData = {};
    const values = nutritionString.split(',');

    values.forEach((value) => {
      const [key, val] = value.split(':');
      nutritionData[key.trim()] = val.trim();
    });

    return nutritionData;
  };

  // Extracted nutrition data
  const foodNutritionData = parseNutrition(foodDetails.foodNutrition);

  // Calculate nutritional values based on quantity and actual data
  const calculateNutrition = () => {
    const nutritionData = {};

    for (const key in foodNutritionData) {
      if (foodNutritionData.hasOwnProperty(key)) {
        const value = foodNutritionData[key];

        if (!isNaN(value)) {

          nutritionData[key] = (parseFloat(value) * quantity).toFixed(2);
        } else {

          nutritionData[key] = value;
        }
      }
    }

    return nutritionData;
  };
  const nextAlert1 =() =>{
    setShowCustomAlertExpertUserMsg(false);
    setShowCustomAlertExpertUserConclusionMsg(true);
  }
  const nextAlert = () => {
     
    if (diffInMonths >= 1) {
      setShowCustomAlertStrengthPraiseMsg(false);
      setShowCustomAlertExpertUserMsg(true);
    } else {
      setShowCustomAlertStrengthPraiseMsg(false);
      setShowCustomAlertPlaningEnforcementMsg(true);
    }
  };
  const NutritionalBreakdown = calculateNutrition();
  console.log(NutritionalBreakdown)
  const formattedNutrition = Object.keys(NutritionalBreakdown)
  .map((key) => `${key}: ${NutritionalBreakdown[key]}`)
  .join(', ');
  console.log(formattedNutrition)
  const hideAlert = () => {
    setShowCustomAlertStrengthPraiseMsg(false);
    setShowCustomAlertPlaningEnforcementMsg(false);
    setShowCustomAlertExpertUserMsg(false); // Close the expert user alert if it's open
    setShowCustomAlertExpertUserConclusionMsg(false);
    
    const postData = {
      userId,
      userFood: foodDetails.foodName,
      nutritionalBreakdown: formattedNutrition,
      summary:' ',
      createdDate:"2023-10-17T14:52:47.4033157+05:30"
    };
    console.log('kkkkkkkk', postData)
    axios.post(`${BASE_URL}/UserHealthReports/InsertUserHealthReports`, postData)
    .then((response) => {
      // The request was successful, you can handle the response here if needed
      console.log('API Response:', response.data);

      // After the API call is successful, navigate to the 'Home' screen
      navigation.navigate('Home', {
        screen: 'DineDiary',
        foodName: foodDetails.foodName,
        quantity,
        nutritionData: calculateNutrition(),
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error('API Error:', error);
    });
};

  const handleAddClick = () => {
    setShowCustomAlertStrengthPraiseMsg(true);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={foodImages[foodDetails.foodName]} style={styles.foodImage} />
        <Text style={styles.foodName}>{foodDetails.foodName}</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <Picker
            selectedValue={quantity}
            onValueChange={(itemValue) => setQuantity(itemValue)}
            style={styles.quantityPicker}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Picker.Item key={value} label={value.toString()} value={value} />
            ))}
          </Picker>
          <TouchableOpacity onPress={handleAddClick} style={styles.addButton}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Description Text Input */}
        <View>
          <Text style={styles.tableHeader1}>Description</Text>
        </View>
        <View>
          <Text style={styles.tableHeader}>{foodDetails.foodDescription}</Text>
        </View>

        {/* Nutrition Breakdown Text Input */}
        <Text style={styles.tableHeader1}>Nutritional Breakdown</Text>
        <View style={styles.tableContainer}>
          {Object.keys(foodNutritionData).map((key) => (
            <View style={styles.tableRow} key={key}>
              <Text>{key}</Text>
              <Text>{calculateNutrition()[key]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* First Custom Alert */}
      <CustomAlertStrengthPraiseMsg visible={showCustomAlertStrengthPraiseMsg} onNext={nextAlert} />
      <CustomAlertExpertUserMsg visible={showCustomAlertExpertUserMsg} onNext1={nextAlert1} />
      <CustomAlertPlaningEnforcementMsg visible={showCustomAlertPlaningEnforcementMsg} onClose={hideAlert} />
     <CustomAlertExpertUserConclusionMsg visible={showCustomAlertExpertUserConclusionMsg} onClose={hideAlert}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  foodImage: {
    width: 250,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#000',
  },
  quantityPicker: {
    width: 100,
  },
  tableContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#c8e1ff',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#c8e1ff',
    paddingVertical: 8,
  },
  tableHeader: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  tableHeader1: {
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
});

export default FoodDetailsPage;