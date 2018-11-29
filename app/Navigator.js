import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

import Explore from './screens/Explore';
import Facts from './screens/Facts';
import MyReason from './screens/MyReason';
import AddReason from './screens/AddReason';
import Email from './screens/Email';
import Profile from './screens/Profile';

const ExploreStack = createStackNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      header: null
    }
  },
  Facts: Facts
});

const TabNavigator = createBottomTabNavigator({
  Explore: {
    screen: ExploreStack,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: <Icon name="barschart" size={40} />
    },
  },
  MyReason: {
    screen: MyReason,
    navigationOptions: {
      tabBarLabel: 'MyReason',
      tabBarIcon: <Icon name="bars" size={35} />
    },
  },
  AddReason: {
    screen: AddReason,
    navigationOptions: {
      tabBarLabel: 'Add Reason',
      tabBarIcon: <Icon name="plus" size={45} />
    },
  },
  Email: {
    screen: Email,
    navigationOptions: {
      tabBarLabel: 'Email',
      tabBarIcon: <Icon name="mail" size={35} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: <Icon name="user" size={40} />
    },
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOptions: {
      showLabel: false,
      activeBackgroundColor: '#ddd',
      inactiveBackgroundColor: '#eee',
    }
  })
});

export default createAppContainer(TabNavigator);
