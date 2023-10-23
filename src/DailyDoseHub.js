import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useUser } from './UserContext';
import BASE_URL from './apiConfig';

const DailyDoseHub = () => {
  const { userdata } = useUser();
  const userId = userdata.userID.replace(/\D/g, '');
  const [selected, setSelected] = useState('');
  const [foodList, setFoodList] = useState([]);
  const window = Dimensions.get('window');
  const windowHeight = window.height;

  const fetchFoodDataForDate = async (selectedDate) => {
    try {
      const apiUrl = `${BASE_URL}/UserHealthReports/GetUserHealthReportsById/${userId}?date=${selectedDate}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const formattedData = data.map((item) => ({
          'Food Name': item.userFood,
          'Nutritional Breakdown': item.nutritionalBreakdown,
          'Doctor Advice': item.summary,
        }));

        setFoodList(formattedData);
        
      } else {
        setFoodList([]);
      }
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const onDayPress = (day) => {
    fetchFoodDataForDate(day.dateString);
    setSelected(day.dateString);
  };

  useEffect(() => {
    const today = new Date();
    const initialDate = today.toISOString().split('T')[0];
    fetchFoodDataForDate(initialDate);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Diet History</Text>
      </View>

      <Calendar
        style={{ height: 310 }}
        onDayPress={onDayPress}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true },
        }}
      />
      <View style={{ height: windowHeight * 0.38, backgroundColor: '#99ddff', borderRadius: 20, marginLeft: 8 }}>
       
        <View style={{ flex: 1 }}>
          <FlatList
            data={foodList.length > 0 ? foodList : [{ 'Food Name': 'No Records Found', 'Nutritional Breakdown': 'No Records Found ', 'Doctor Advice': 'No Records Found' }]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Text style={styles.label}>Food Name: <Text style={styles.value}>{item['Food Name']}</Text></Text>


                <Text style={styles.label}>Nutritional Breakdown:</Text>
                <Text style={styles.value}>{item['Nutritional Breakdown']}</Text>

                <Text style={styles.label}>Doctor Advice:</Text>
                <Text style={styles.value}>{item['Doctor Advice']}</Text>
                <Text>    </Text>
              </View>
            )}
          />

        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 20,
    padding: 8,

  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  value: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#000000',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    color: '#000000',
    marginTop: 10,
  },
  heading1: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    color: '#000000',
  },
  headerContainer: {
    backgroundColor: '#99ddff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DailyDoseHub;