import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, View, TouchableOpacity, Modal, FlatList, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EducationalContent from './EducationalContent';
import Recipe from './Recipe';
import Home from './Home';
import Connections from './Connections';
import Stories from './Stories';
import Profile from './Profile';
import Language from './Language';
import Settings from './Settings';
import Logout from './Logout';
import Users from './Users';
import UserComments from './UserComments.js';
import { useUser } from './UserContext';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Your Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator  screenOptions={{headerShown: false}} initialRouteName="Home">
     <Tab.Screen
    name="Education"
          component={EducationalContent}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../assets/icons/book.png')
                    : require('../assets/icons/book.png')
                }
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Recipe"
          component={Recipe}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../assets/icons/recipe.png')
                    : require('../assets/icons/recipe.png')
                }
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: null,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../assets/icons/home.png')
                    : require('../assets/icons/home.png')
                }
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Connections"
          component={Connections}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../assets/icons/connect.png')
                    : require('../assets/icons/connect.png')
                }
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Stories"
          component={Stories}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require('../assets/icons/stories.png')
                    : require('../assets/icons/stories.png')
                }
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
  </Tab.Navigator>
);

// Custom header with icons and dropdown
const HeaderRight = ({navigation} ) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { userdata } = useUser();
  const isAdmin = userdata.isAdmin;
  //console.log("User Data :" , userdata);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleOptionSelect = (screenName) => {
    closeDropdown();
    navigation.navigate(screenName); // Navigate to the selected screen
    
  };
  const dropdownOptions = [
    { label: 'Profile',screenName: 'Profile', icon: require('../assets/icons/profile.png') },
    { label: 'Language', screenName: 'Language', icon: require('../assets/icons/language.png') },
    { label: 'Settings', screenName: 'Settings', icon: require('../assets/icons/settings.png') },
    { label: 'User Comments', screenName: 'UserComments', icon: require('../assets/icons/comments.png') },
    ...(isAdmin ? [{ label: 'Users', screenName: 'Users', icon: require('../assets/icons/users.png') }] : []),
    { label: 'logout', screenName: 'Logout', icon: require('../assets/icons/logout.png') },
   
  ];
  
  const renderDropdownOption = ({ item }) => (
    <TouchableOpacity style={{ padding: 16 }} onPress={() => handleOptionSelect(item.screenName)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={item.icon} style={{ width: 24, height: 24, marginRight: 8 }} />
        <Text>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 16 }}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={require('../assets/icons/bell.png')} style={{ width: 25, height: 25, marginRight: 16 }} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/icons/profile.png')} style={{ width: 30, height: 30, marginRight: 16, borderRadius: 15 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={require('../assets/icons/cratedown.png')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onPress={closeDropdown}>
          <View style={{ backgroundColor: 'white', width: 200, position: 'absolute', top: 60, right: 20, borderRadius: 10 }}>
            <FlatList 
              data={dropdownOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderDropdownOption}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Main Stack Navigator
const MainStack = (navigation ) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={TabNavigator}
      options={({ navigation }) => ({
        headerTitle: 'MI Diario',
        headerStyle: { backgroundColor: '#33bbff' },
        headerRight: () => <HeaderRight navigation={navigation} />,
      })}
    />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Language" component={Language} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="UserComments" component={UserComments} options={{headerTitle: 'User Comments',}} />
    <Stack.Screen name="Users" component={Users} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

const Dashboard1 = () => (
     
    <MainStack />
);


export default Dashboard1; 

