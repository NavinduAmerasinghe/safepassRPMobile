import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Vibration,
  LogBox,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "react-native-modal";
import animalinfo from "./screen/data/AnimalInfo";
import GuideLine from "./screen/Notification";
import { Audio } from "expo-av";
import LoginScreen from "./screen/loginScreen/loginScreen";
import SignupScreen from "./screen/signupScreen/signupScreen";
import LandingScreen from "./screen/LandingScreen/LandingScreen";
import DashBoardScreen from "./screen/DashBoardScreen/DashBoardScreen";
import TabNavScreen from "./screen/TabNavScreen/TabNavScreen";
import GeofenceMap from "./screen/GeofenceMap/GeofenceMap";
import LocationHistory from "./screen/LocationHistoryScreen/LocationHistoryScreen";
import HomeScreen from "./screen/HomeScreen/HomeScreen";
// import UserLocation from "./screen/Location/UserLocation";
import * as Notifications from "expo-notifications";
import UserLocation from "./screen/Location/UserLocation";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

// import Sound from 'react-native-sound';
//app.js

// import Sound from 'react-native-sound';
// import { Platform } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="GeofenceMap" component={GeofenceMap} /> */}
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="loginScreen" component={LoginScreen} />
        <Stack.Screen name="signupScreen" component={SignupScreen} />
        <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
        <Stack.Screen name="TabNavScreen" component={TabNavScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GuideLines" component={GuideLine} />
        <Stack.Screen name="LocationHistory" component={LocationHistory} />
        {/* <Stack.Screen name="UserLocation" component={UserLocation}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
