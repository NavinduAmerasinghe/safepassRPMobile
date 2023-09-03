import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper";
import randomImage from "../../assets/images/randomImage";
import EmptyList from "../../components/emptyList";
import { colors } from "../../theme";
import UserLocation from "../../screen/Location/UserLocation";
import Background from "../background";
import { AntDesign } from "@expo/vector-icons";

export default function DashBoardScreen({ navigation }) {
  return (
    <Background>
      <ScreenWrapper className="flex-1">
        <View className="flex-row justify-between items-center p-4">
          <Text
            className={`${colors.heading} font-bold text-3xl shadow-sm`}
            style={{ color: "#B53471" }}
          >
            DashBoard
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("loginScreen")}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full"
          >
            <Text className={colors.heading}>
              <AntDesign name="logout" size={24} color="black" />
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
          {/* <Image
            source={require("../../assets/images/banner.png")}
            className="w-60 h-60"
          /> */}
          <UserLocation />
        </View>
        <View className="px-4 space-y-3">
          <View className="flex-row justify-between items-center mb-8">
            <Text
              className={`${colors.heading} font-bold text-xl`}
              style={{ color: "white" }}
            >
              Quick Access
            </Text>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("AddTrip")}
              className="p-2 px-3 bg-white border border-gray-200 rounded-full"
            >
              <Text className={colors.heading}>Add Feature</Text>
            </TouchableOpacity> */}
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                className="bg-white p-3 rounded-2xl mb-3 shadow-sm mr-4"
              >
                <View>
                  <Image source={randomImage()} className="w-36 h-36 mb-2" />
                  <Text className={`${colors.heading} font-bold`}>
                    Animal Details
                  </Text>
                  <Text className={`${colors.heading} text-xs`}>Guidlines</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("LocationHistory")}
                className="bg-white p-3 rounded-2xl mb-3 shadow-sm"
              >
                <View>
                  <Image source={randomImage()} className="w-36 h-36 mb-2" />
                  <Text className={`${colors.heading} font-bold`}>
                    Location History
                  </Text>
                  <Text className={`${colors.heading} text-xs`}>Details</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("AboutUsScreen")}
              className="bg-white p-3 rounded-2xl mb-3 shadow-sm"
            >
              <View>
                <Image source={randomImage()} className="w-36 h-36 mb-2" />
                <Text className={`${colors.heading} font-bold`}>
                  Animal Details
                </Text>
                <Text className={`${colors.heading} text-xs`}>Guidlines</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("AboutUsScreen")}
              className="bg-white p-3 rounded-2xl mb-3 shadow-sm"
            >
              <View>
                <Image source={randomImage()} className="w-36 h-36 mb-2" />
                <Text className={`${colors.heading} font-bold`}>About US</Text>
                <Text className={`${colors.heading} text-xs`}>SafePass</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </Background>
  );
}
