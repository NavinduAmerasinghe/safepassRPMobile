// import React from "react";
// import { View, Text } from "react-native";
// import dataArray from "./data/GuideLines";
// import { StyleSheet } from "react-native";

// const Notification = ({ route }) => {
//   const { itemNumber } = route.params;

//   const getTitleData = (id) => {
//     const data = dataArray.find((item) => item.id === id);
//     return data;
//   };

//   const matchedData = getTitleData(itemNumber);

//   // Use the itemNumber to fetch and display the details

//   return (
//     <View>
//       {matchedData && (
//         <View>
//           <Text style={styles.container}>{matchedData.title}</Text>
//           <Text>{matchedData.description}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     fontSize: 30,
//   },
// });

// export default Notification;
// import React, { useEffect, useState } from "react";
// import { View, Text, Button } from "react-native";
// import dataArray from "./data/GuideLines";
// import { StyleSheet } from "react-native";
// import GeofenceMap from "./GeofenceMap/GeofenceMap";
// import { TextInput } from "react-native-gesture-handler";
// import * as Speech from "expo-speech";

// const Notification = ({ route }) => {
//   const { itemNumber } = route.params;
//   const [isSpeaking, setIsSpeaking] = useState(true); // Start with speaking
//   const [matchedData, setMatchedData] = useState(null);

//   useEffect(() => {
//     const data = getTitleData(itemNumber);
//     setMatchedData(data);

//     if (data) {
//       const options = {
//         pitch: 0.8,
//         rate: 1.1,
//       };

//       setIsSpeaking(true);
//       Speech.speak(data.description, options);
//     }

//     return () => {
//       Speech.stop();
//       setIsSpeaking(false);
//     };
//   }, [itemNumber]);

//   const getTitleData = (id) => {
//     const data = dataArray.find((item) => item.id === parseInt(id));
//     return data;
//   };
//   const stopSpeaking = () => {
//     Speech.stop();
//     setIsSpeaking(false);
//   };
//   const startSpeaking = () => {
//     const data = getTitleData(itemNumber);

//     Speech.speak(data.description);
//     setIsSpeaking(true);
//   };
//   return (
//     <View>
//       {matchedData && (
//         <View>
//           <Text style={styles.container}>{matchedData.title}</Text>
//           <Text>{matchedData.description}</Text>
//           {isSpeaking ? (
//             <Button title="Stop Speak" onPress={stopSpeaking} />
//           ) : (
//             <Button title="Start Speaking" onPress={startSpeaking} />
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     fontSize: 30,
//   },
// });

// export default Notification;
import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import dataArray from "./data/GuideLines";
import { StyleSheet } from "react-native";
import * as Speech from "expo-speech";

const Notification = ({ route }) => {
  const { itemNumber } = route.params;
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [matchedData, setMatchedData] = useState(null);

  useEffect(() => {
    const data = getTitleData(itemNumber);
    setMatchedData(data);

    if (data) {
      const options = {
        pitch: 0.8,
        rate: 1.1,
      };

      setIsSpeaking(true);
      Speech.speak(data.description, options);
    }

    return () => {
      Speech.stop();
      setIsSpeaking(false);
    };
  }, [itemNumber]);

  const getTitleData = (id) => {
    const data = dataArray.find((item) => item.id === parseInt(id));
    return data;
  };
  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };
  const startSpeaking = () => {
    const data = getTitleData(itemNumber);

    Speech.speak(data.description);
    setIsSpeaking(true);
  };

  return (
    <View style={styles.container}>
      {matchedData && (
        <View style={styles.notificationContainer}>
          <Text style={styles.title}>{matchedData.title}</Text>
          {isSpeaking ? (
            <Button
              style={styles.speechButton}
              title="Stop Speak  🔇"
              onPress={stopSpeaking}
            />
          ) : (
            <Button
              style={styles.speechButton}
              title="Start Speaking  🔊"
              onPress={startSpeaking}
            />
          )}
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>{matchedData.description}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    // justifyContent: "center",
    // alignItems: "center",
  },
  notificationContainer: {
    backgroundColor: "rgba(0, 25, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    paddingTop: 40,
  },
  title: {
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Sofia",
    fontSize: 29,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    // textAlign: "center",
    color: "white",
    textAlign: "justify",
    paddingTop: 20,
  },
  speechButton: {
    backgroundColor: "transparent",
    borderColor: "red", // Add a border color for the button
    borderWidth: 2, // Add a border width
    borderRadius: 8,
    paddingVertical: 5, // Adjust the vertical padding
    paddingHorizontal: 15, // Adjust the horizontal padding
    alignSelf: "center",
  },
  buttonText: {
    color: "#007bff", // Use the same color as the border for text
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    maxHeight: 600, // Set the maximum height of the ScrollView
  },
});

export default Notification;
