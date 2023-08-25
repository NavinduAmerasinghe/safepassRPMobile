import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper";
import randomImage from "../../assets/images/randomImage";
import EmptyList from "../../components/emptyList";
import { colors } from "../../theme";
import UserLocation from "../../screen/Location/UserLocation";
import Background from "../background";
// const items = [
//   {
//     id: 1,
//     place: "Gujrat",
//     country: "Pakistan",
//   },
//   {
//     id: 2,
//     place: "London Eye",
//     country: "England",
//   },
//   {
//     id: 3,
//     place: "Washington dc",
//     country: "America",
//   },
//   {
//     id: 4,
//     place: "New york",
//     country: "America",
//   },
// ];

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
            // onPress={handleLogout}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full"
          >
            <Text className={colors.heading}>Logout</Text>
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
            <TouchableOpacity
              // onPress={() => navigation.navigate("AddTrip")}
              className="p-2 px-3 bg-white border border-gray-200 rounded-full"
            >
              <Text className={colors.heading}>Add Feature</Text>
            </TouchableOpacity>
          </View>
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
              // onPress={() =>
              //   navigation.navigate("TripExpenses", { ...item })
              // }
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
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("TripExpenses", { ...item })
              // }
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
              // onPress={() =>
              //   navigation.navigate("TripExpenses", { ...item })
              // }
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
          </View>
          {/* <View style={{ height: 430 }}>
          <FlatList
            data={items}
            numColumns={2}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            className="mx-1"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate("TripExpenses", { ...item })
                  // }
                  className="bg-white p-3 rounded-2xl mb-3 shadow-sm"
                >
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} text-xs`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View> */}
        </View>
      </ScreenWrapper>
    </Background>
  );
}
