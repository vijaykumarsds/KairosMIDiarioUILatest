import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Modal, FlatList, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import Language from './Language';
import Settings from './Settings';
import Logout from './Logout';
import Users from './Users';
import UserComments from './UserComments.js';
import { useUser } from './UserContext';
import Notifications from './Notifications';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';


const Stack = createStackNavigator();

// Custom header with icons and dropdown
const HeaderRight = ({navigation} ) => {
  const { t } = useTranslation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { userdata } = useUser();
  const isAdmin = userdata.isAdmin;

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const notificationsModel = () => {
    navigation.navigate('Notifications');
  };

  const handleOptionSelect = (screenName) => {
    closeDropdown();
    if (screenName === 'Logout') {
      // Handle the logout action by navigating to the login page
      navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
    } else {
      navigation.navigate(screenName); // Navigate to the selected screen
    }
  };
  const dropdownOptions = [
    { label: t('Profile'), screenName: 'Profile', icon: require('../assets/icons/profile.png') },
    { label: t('Language'), screenName: 'Language', icon: require('../assets/icons/language.png') },
    { label: t('Settings'), screenName: 'Settings', icon: require('../assets/icons/settings.png') },
    { label: t('User Comments'), screenName: 'UserComments', icon: require('../assets/icons/comments.png') },
    ...(isAdmin ? [{ label: t('Users'), screenName: 'Users', icon: require('../assets/icons/users.png') }] : []),
    { label: t('Logout'), screenName: 'Logout', icon: require('../assets/icons/logout.png') },
   
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
      <TouchableOpacity onPress={notificationsModel}>
        <Image source={require('../assets/icons/bell.png')} 
        style={{ width: 25, height: 25, marginRight: 16 }} />
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
const MainStack = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to get the t function

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dash"
        component={Footer}
        options={({ navigation }) => ({
          headerTitle: 'MI Diario', 
          headerStyle: { backgroundColor: '#33bbff' },
          headerLeft: null,
          headerRight: () => <HeaderRight navigation={navigation} t={t} />, 
        })}
      />
       <Stack.Screen name="Profile" component={Profile} options={{ title: t('Profile') }} />
      <Stack.Screen name="Language" component={Language} options={{ title: t('Language') }} />
      <Stack.Screen name="Settings" component={Settings} options={{ title: t('Settings') }} />
      <Stack.Screen name="UserComments" component={UserComments} options={{ title: t('User Comments') }} />
      <Stack.Screen name="Users" component={Users} options={{ title: t('Users') }} />
      <Stack.Screen name="Logout" component={Logout} options={{ title: t('Logout') }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: t('Notifications') }} />
    </Stack.Navigator>
  );
};

const Dashboard1 = () => (
     
    <MainStack />
);


export default Dashboard1; 

