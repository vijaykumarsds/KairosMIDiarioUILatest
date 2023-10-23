import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodSelection from './FoodSelection';
import FoodDetailsPage from './FoodDetailsPage';
import AddFoodItemScreen from './AddFoodItemScreen';
import DailyDoseHub from './DailyDoseHub';
import GlucoseGuard from './GlucoseGuard';
import { useTranslation } from 'react-i18next';

const Home1 = ({ navigation, route }) => {
  const { t } = useTranslation();
  const Stack = createStackNavigator();
  const [foodName, setFoodName] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState();
  const [nutritionData, setNutritionData] = useState({});

  useEffect(() => {

    if (route.params && route.params.foodName && route.params.quantity && route.params.nutritionData) {

      const { foodName, quantity, nutritionData } = route.params;
      setFoodName(foodName);
      setSelectedQuantity(quantity);
      setNutritionData(nutritionData);

    }
  }, [route.params]);



  return (
    <Stack.Navigator initialRouteName="DineDiary" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DineDiary">
        {() => (
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: 10 }}>
              <View style={styles.card}>
                <View style={styles.row}>
                  <Image
                    source={require('../assets/icons/meal.png')}
                    style={[styles.icon, { width: 25, height: 25 }]}
                  />
                  <Text style={styles.text}>{t('Dine Diary')} </Text>
                </View>
                <View style={styles.childRow}>

                  {foodName ? (
                    <View>
                      <Text style={styles.childText}>{t('You ate')}: {foodName}</Text>
                      <Text style={styles.childText}>{t('Quantity')}: {selectedQuantity}</Text>
                      <Text style={styles.childText}>{t('Nutritional Breakdown')}:</Text>
                      <View>
                        {Object.keys(nutritionData).map((key) => (
                          <View key={key}>
                            <Text>{key}: {nutritionData[key]}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.childText}>{t('What did you eat for lunch today?')}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('FoodSelection')}
                    style={styles.buttonContainer}
                  >
                    <Image
                      source={require('../assets/icons/add.png')}
                      style={[styles.button, { width: 25, height: 25 }]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.childRow}>


                </View>

              </View>
              <View style={styles.card}>
                <View style={styles.row}>
                  <Image
                    source={require('../assets/icons/glucose-meter.png')}
                    style={[styles.icon, { width: 25, height: 25 }]}
                  />
                  <Text style={styles.text}>{t('Glucose Guard')}</Text>
                </View>
                <View style={styles.childRow}>
                  <Text style={styles.childText}>{t('Keep an eye on your glucose levels.')}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('GlucoseGuard')}
                    style={styles.buttonContainer}
                  >
                    <Image
                      source={require('../assets/icons/navigation.png')}
                      style={[styles.button, { width: 25, height: 25 }]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.row}>
                  <Image source={require('../assets/icons/dose.png')} style={[styles.icon, { width: 25, height: 25 }]} />
                  <Text style={styles.text}>{t('Daily Dose Hub')}</Text>
                </View>
                <View style={styles.childRow}>
                  <Text style={styles.childText}> {t('Your detailed health Reports.')}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DailyDoseHub')}
                    style={styles.buttonContainer}
                  >
                    <Image source={require('../assets/icons/navigation.png')} style={[styles.button, { width: 25, height: 25 }]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Stack.Screen>
      <Stack.Screen name="FoodSelection" component={FoodSelection} options={{ headerTitle: 'Food Selection' }} />
      <Stack.Screen name="FoodDetailsPage" component={FoodDetailsPage} options={{ headerTitle: 'Food Details', }} />
      <Stack.Screen name="AddFoodItemScreen" component={AddFoodItemScreen} options={{ headerTitle: 'Add Food Item', }} />
      <Stack.Screen name="GlucoseGuard" component={GlucoseGuard} options={{ headerTitle: 'GlucoseGuard' }} />
      <Stack.Screen
        name="DailyDoseHub"
        component={DailyDoseHub}
        options={{ headerTitle: 'Your Diet History' }}
      />
    </Stack.Navigator>
  );
};

export default Home1;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 40,
    margin: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row', 
    marginLeft: -30,
  },
  text: {
    fontSize: 22,
    color: 'green',
    marginLeft: 10,
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childText: {
    fontSize: 16,
    marginRight: 8,
    color: 'blue',
  },
  buttonContainer: {
    borderRadius: 4,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
