import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign"
import { RFPercentage } from 'react-native-responsive-fontsize';
import { View } from 'react-native';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Inbox from '../Screens/Inbox';
import colors from '../configs/colors';
import fonts from '../configs/fonts';
import Sessions from '../Screens/Sessions';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="homescreen"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.black,
          marginHorizontal: RFPercentage(1.5),
          marginBottom: RFPercentage(2),
          borderRadius: RFPercentage(3),
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.21,
          shadowRadius: 7.68,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'homescreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'sessions') {
            iconName = focused ? 'all-inclusive-box' : 'all-inclusive';
          } else if (route.name === 'inbox') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <View style={{ alignSelf: 'center',marginTop:RFPercentage(1) }}>
              <MaterialCommunityIcons name={iconName} size={30} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="homescreen"
        component={Home}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="sessions"
        component={Sessions}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="inbox"
        component={Inbox}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;