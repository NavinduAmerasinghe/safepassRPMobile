// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, FlatList } from "react-native";
// import Card from "../cardComponent";

// const DashBoardScreen = () => {
//   const [progress, setProgress] = useState(0);
//   const restaurants = [
//     {
//       name: "The Muffin Man Bakery",
//       categories: "Desserts, Cakes and Bakery",
//       deliveryTime: "35 min",
//       distance: "3.7 km",
//       image: require("../../assets/central-perk.jpg"),
//       id: 1,
//     },
//     {
//       name: "Central Perk Coffee House",
//       categories: "Beverages, Desserts, Cakes and Bakery",
//       deliveryTime: "45 min",
//       distance: "4.3 km",
//       // image: require("../../assets/central-perk.jpg"),
//       id: 2,
//     },
//   ];
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={restaurants}
//         renderItem={({ item }) => {
//           return <Card info={item} />;
//         }}
//         keyExtractor={(restaurant) => restaurant.id.toString()}
//         showsVerticalScrollIndicator={false}
//       />
//       <View style={{ flex: 1, justifyContent: "center" }}>
//         <Text style={styles.heading}>Font S</Text>
//       </View>
//       <View style={{ flex: 2, width: "100%", alignItems: "center" }}>
//         <View style={styles.section}>
//           <Text style={styles.text}>Hello guys</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.text}>Hello guys</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.text}>Hello guys</Text>
//         </View>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#444B6F",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   section: {
//     backgroundColor: "rgb(6,35,48)",
//     width: "90%",
//     minHeight: 100,
//     justifyContent: "center",
//     borderRadius: 20,
//     padding: 10,
//     paddingHorizontal: 20,
//     marginBottom: 35,
//   },
// });

// export default DashBoardScreen;

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper";
import randomImage from "../../assets/images/randomImage";
import EmptyList from "../../components/emptyList";
import { colors } from "../../theme";
const items = [
  {
    id: 1,
    place: "Gujrat",
    country: "Pakistan",
  },
  {
    id: 2,
    place: "London Eye",
    country: "England",
  },
  {
    id: 3,
    place: "Washington dc",
    country: "America",
  },
  {
    id: 4,
    place: "New york",
    country: "America",
  },
  {
    id: 5,
    place: "Gujrat",
    country: "Pakistan",
  },
  {
    id: 6,
    place: "London Eye",
    country: "England",
  },
  {
    id: 7,
    place: "Washington dc",
    country: "America",
  },
  {
    id: 8,
    place: "New york",
    country: "America",
  },
];

export default function DashBoardScreen() {
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          DashBoard
        </Text>
        <TouchableOpacity
          // onPress={handleLogout}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full"
        >
          <Text className={colors.heading}>Logoutt</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          source={require("../../assets/images/banner.png")}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Quick Access
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate("AddTrip")}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full"
          >
            <Text className={colors.heading}>Add Tripp</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 430 }}>
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
        </View>
      </View>
    </ScreenWrapper>
  );
}
