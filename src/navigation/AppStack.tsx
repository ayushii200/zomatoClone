// // import {StyleSheet} from 'react-native';
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import AboutScreen from '../screens/AboutScreen';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import SettingScreen from '../screens/SettingScreen';

// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {backgroundColor: 'pink'},
//         tabBarLabelStyle: {fontSize: 16},
//         tabBarActiveTintColor: 'blue',
//         tabBarInactiveTintColor: 'black',
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: () => <FontAwesome name="home" size={20} />,
//         }}
//       />
//       <Tab.Screen
//         name="About"
//         component={AboutScreen}
//         options={{
//           tabBarIcon: () => <FontAwesome name="users" size={20} />,
//         }}
//       />
//       <Tab.Screen
//         name="Setting"
//         component={SettingScreen}
//         options={{
//           tabBarIcon: () => <FontAwesome name="gear" size={20} />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function CoTabs() {
//   return (
//     <Tab.Navigator screenOptions={{headerShown: false}}>
//       <Tab.Screen
//         name="About"
//         component={AboutScreen}
//         options={{
//           tabBarIcon: () => <FontAwesome name="users" />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function StackScreen() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="myTabs" component={MyTabs} />
//     </Stack.Navigator>
//   );
// }

// function InfoScreen() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="CoTabs" component={CoTabs} />
//     </Stack.Navigator>
//   );
// }

// const AppStack = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="Feed" component={StackScreen} />
//         <Drawer.Screen name="Info" component={InfoScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };
// export default AppStack;

//AJIO

// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import Splash from '../screens/Splash';
// import ContactUs from '../screens/ContactUs';
// import {NavigationContainer} from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createStackNavigator();
// export default function AppStack() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Splash" component={Splash} />
//         <Stack.Screen name="ContactUs" component={ContactUs} />
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashZomato from '../ZomatoScreens/SplashZomato';
import Login from '../ZomatoScreens/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../ZomatoScreens/Home';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../Common/images';
import Dining from '../ZomatoScreens/Dining';
import Events from '../ZomatoScreens/Events';
import Profile from '../ZomatoScreens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const EmptyComponent = () => null;

const goToBlinkitWebsite = () => {
  Linking.openURL('https://www.blinkit.com');
};

function InfoScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CoTabs" component={CoTabs} />
    </Stack.Navigator>
  );
}

function CoTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Delivery"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images.delivery}
              style={{tintColor: focused ? 'red' : 'grey'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dining"
        component={Dining}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images.dinner}
              style={{
                tintColor: focused ? 'red' : 'grey',
                height: 50,
                width: 40,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images.ticket}
              style={{
                tintColor: focused ? 'red' : 'grey',
                height: 30,
                width: 40,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Blinkit"
        component={EmptyComponent}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <TouchableOpacity onPress={goToBlinkitWebsite}>
              <Image
                source={images.blinkit}
                style={{
                  height: 50,
                  width: 90,
                  marginTop: 21,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashZomato" component={SplashZomato} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={InfoScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
