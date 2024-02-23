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

// const CustomTabBar = ({state, descriptors, navigation}) => {
//   return (
//     <View style={styles.tabBar}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const tintColor =
//           route.name === 'blinkit' ? null : isFocused ? 'red' : 'grey';

//         return (
//           <TouchableOpacity
//             key={index}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? {selected: true} : {}}
//             onPress={onPress}
//             style={styles.tabItem}>
//             <Image
//               source={options.tabBarIcon({focused: isFocused})}
//               style={{
//                 tintColor: tintColor,
//                 height: options.height || 30,
//                 width: options.width || 40,
//               }}
//             />
//             <Text style={{color: isFocused ? 'red' : 'grey'}}>{label}</Text>
//             {isFocused && <View style={styles.line} />}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

function InfoScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CoTabs" component={CoTabs} />
    </Stack.Navigator>
  );
}
// function CoTabs() {
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomTabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//         tabBarLabelStyle: {
//           fontSize: 16,
//         },
//         tabBarActiveTintColor: 'black',
//       }}>
//       <Tab.Screen
//         name="Delivery"
//         component={Home}
//         options={{
//           tabBarIcon: ({focused}) => images.delivery,
//         }}
//       />
//       <Tab.Screen
//         name="Dining"
//         component={Dining}
//         options={{
//           tabBarIcon: ({focused}) => images.dinner,
//         }}
//       />
//       <Tab.Screen
//         name="Events"
//         component={Events}
//         options={{
//           tabBarIcon: ({focused}) => images.ticket,
//         }}
//       />
//       <Tab.Screen
//         name="Blinkit"
//         component={EmptyComponent}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: () => (
//             <TouchableOpacity onPress={goToBlinkitWebsite}>
//               <Image
//                 source={images.blinkit}
//                 style={{
//                   height: 50,
//                   width: 90,
//                   marginTop: 21,
//                 }}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       {/* <Tab.Screen
//         name="Blinkit"
//         component={EmptyComponent}
//         options={{
//           // tabBarLabel: '',
//           tabBarIcon: () => images.blinkit,
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// }
// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: 'lightgrey',
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   line: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: 2,
//     backgroundColor: 'red',
//   },
// });
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
