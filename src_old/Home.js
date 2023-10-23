import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Home = () => {
  const handleButtonPress = (sectionName) => {
    console.log(`Button pressed for ${sectionName}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.leftContent}>
          <Image source={require('../assets/icons/meal.png')} style={styles.bodyIcon} />
          <Text style={styles.heading}>DineDairy</Text>
        </View>
        
        <TouchableOpacity onPress={() => handleButtonPress('DineDairy')}>
          <Image source={require('../assets/icons/add.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.childText}>Sample text</Text> */}

      <View style={styles.section}>
        <View style={styles.leftContent}>
          <Image source={require('../assets/icons/glucose-meter.png')} style={styles.bodyIcon} />
          <Text style={styles.heading}>GlucoseGuard</Text>
        </View>
        <TouchableOpacity onPress={() => handleButtonPress('GlucoseGuard')}>
          <Image source={require('../assets/icons/navigation.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <View style={styles.leftContent}>
          <Image source={require('../assets/icons/dose.png')} style={styles.bodyIcon} />
          <Text style={styles.heading}>DailyDoseHub</Text>
        </View>
        <TouchableOpacity onPress={() => handleButtonPress('DailyDoseHub')}>
          <Image source={require('../assets/icons/navigation.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',

  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns items to the space between them
    width: '80%', // Adjust this value to control the width of the sections
    marginBottom: 20,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyIcon: {
    width: 40,
    height: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 30,
    color:'#000000'
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight:-40
  },
  childText: {
    marginTop: 3,
    fontSize: 18,
    color: '#33bbff' ,
     fontStyle: 'italic' ,
     alignItems: 'flex-start'

  },
});

export default Home;
