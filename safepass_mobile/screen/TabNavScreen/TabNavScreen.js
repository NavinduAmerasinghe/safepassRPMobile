import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../loginScreen/loginScreen";
import SignupScreen from "../signupScreen/signupScreen";
import LandingScreen from "../LandingScreen/LandingScreen";
import GeofenceMap from "../GeofenceMap/GeofenceMap";
import DashBoardScreen from "../DashBoardScreen/DashBoardScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import { AboutUsScreen } from "../AboutUsScreen/AboutUsScreen";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: 60,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    elevation: 2,
    backgroundColor: "#16247d",
  },
};
const TabNavScreen = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="DashBoardScreen"
        component={DashBoardScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#16241d",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                }}
              >
                <MaterialIcons
                  name="dashboard"
                  size={24}
                  color={focused ? "#fff" : "#111"}
                />
                <Text style={{ fontSize: 8, color: "#fff" }}>DashBoard</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="integration-instructions"
                  size={24}
                  color={focused ? "#fff" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#fff" }}>Guidlines</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="users"
                  size={18}
                  color={focused ? "#fff" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#fff" }}>About Us</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabNavScreen;
