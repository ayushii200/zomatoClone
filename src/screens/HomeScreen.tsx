import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutScreen from '../screens/AboutScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screens/SettingScreen';
import ListScreen from './ListScreen';
import ToDoList from './ToDoList';
import GoogleSignIn from './GoogleSignIn';
import Banner from './Banner';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'grey'},
        tabBarLabelStyle: {fontSize: 16},
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="users" size={20} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="gear" size={20} />,
        }}
      />
      <Tab.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="list" size={20} />,
        }}
      />
      <Tab.Screen
        name="ToDoList"
        component={ToDoList}
        options={{
          tabBarIcon: () => <FontAwesome name="list" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

function CoTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="GoogleSignIn"
        component={GoogleSignIn}
        options={{
          tabBarIcon: () => <FontAwesome name="users" />,
        }}
      />
      <Tab.Screen
        name="Banner"
        component={Banner}
        options={{
          tabBarIcon: () => <FontAwesome name="users" />,
        }}
      />
    </Tab.Navigator>
  );
}

function StackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="myTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}

function InfoScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CoTabs" component={CoTabs} />
    </Stack.Navigator>
  );
}

const HomeScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={StackScreen} />
      <Drawer.Screen name="Info" component={InfoScreen} />
    </Drawer.Navigator>
  );
};
export default HomeScreen;
