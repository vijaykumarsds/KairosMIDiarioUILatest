import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import EducationalContent from './EducationalContent';
import Recipe from './Recipe';
import Home from './Home';
import Connections from './Connections';
import Stories from './Stories';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const Footer = () => {
  const { t } = useTranslation(); // Get the translation function from context
  const tabBarLabelCommonStyle = {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000'
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Tab.Screen
        name="Education"
        component={EducationalContent}
        options={{
          tabBarLabel: t('Education'), // Use the translation function
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/book.png')
                  : require('../assets/icons/book.png')
              }
              style={{ width: 40, height: 30, tintColor: color }}
            />
          ),
          tabBarLabelStyle: tabBarLabelCommonStyle
        }}

      />
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          tabBarLabel: t('Recipe'),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/recipe.png')
                  : require('../assets/icons/recipe.png')
              }
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          tabBarLabelStyle: tabBarLabelCommonStyle
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: null,
          tabBarLabel: t('Home'),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/home.png')
                  : require('../assets/icons/home.png')
              }
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          tabBarLabelStyle: tabBarLabelCommonStyle
        }}
      />
      <Tab.Screen
        name="Connections"
        component={Connections}
        options={{
          tabBarLabel: t('Connections'),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/connect.png')
                  : require('../assets/icons/connect.png')
              }
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          tabBarLabelStyle: tabBarLabelCommonStyle
        }}
      />
      <Tab.Screen
        name="Stories"
        component={Stories}
        options={{
          tabBarLabel: t('Stories'),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/stories.png')
                  : require('../assets/icons/stories.png')
              }
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          tabBarLabelStyle: tabBarLabelCommonStyle
        }}
      />
    </Tab.Navigator>
  );
};

export default Footer;