import React, { useContext } from "react";
import { colors } from "../../theme";
import Background from "../background";
import ScreenWrapper from "../../components/screenWrapper";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../Context/MyContext";

const history = [
  {
    id: 1,
    animalName: "Deer",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 2,
    animalName: "Elephant",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 3,
    animalName: "Mongoose",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 4,
    animalName: "Dog",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 5,
    animalName: "Dog",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 6,
    animalName: "Dog",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 7,
    animalName: "Dog",
    distance: "5km",
    time: "10 min ago",
  },
  {
    id: 8,
    animalName: "Dog",
    distance: "5km",
    time: "10 min ago",
  },
];

const LocationHistoryScreen = (props) => {
  const { container, title, card, animalName, distance, time } = styles;

  const {data} = useContext(MyContext)
  return (
    <Background>
      <ScreenWrapper style={container}>
        <Text style={title}>Location History</Text>
        <Text>{data.length}</Text>
        <ScrollView style={styles.scrollView}>
          {data.map((data,index) => (
            <TouchableOpacity style={card} key={index} onPress={() => {}}>
              <View>
                <Text style={animalName}>{data.animalName}</Text>
                <Text style={distance}>{data.distance}</Text>
                <Text style={time}>{data.time.slice(11, 19)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScreenWrapper>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary,
  },
  card: {
    backgroundColor: "white",
    width: 160,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  animalName: {
    ...colors.heading,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  distance: {
    ...colors.heading,
    fontSize: 12,
    textAlign: "center",
  },
  time: {
    ...colors.heading,
    fontSize: 8,
    textAlign: "center",
  },
});

export default LocationHistoryScreen;