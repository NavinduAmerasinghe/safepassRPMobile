import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { Video } from "expo-av"; // Import Video from Expo's AV library
import Btn from "../btn"; // Make sure Btn is defined and imported
import { darkGreen, green } from "../constants";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const Home = (props) => {
  const [fontsLoaded] = useFonts({
    Sofia: require("../../assets/fonts/Sofia-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <View>
      <Video
        source={require("../../assets/background.mp4")}
        style={styles.video}
        isMuted={true} // Use isMuted instead of muted
        shouldPlay
        isLooping
        resizeMode="cover"
      />
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <Text
          style={{
            color: "#B53471",
            fontSize: 70,
            fontFamily: "Sofia",
          }}
        >
          Safe Pass
        </Text>
        <Text
          style={{
            color: "#B53471",
            fontSize: 24,
            marginBottom: 30,
            fontFamily: "Sofia",
          }}
        >
          For a better world
        </Text>
        <Image
          style={{ width: 220, height: 250, alignSelf: "center" }}
          source={require("../../assets/safepass_logo.png")}
        />
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
        <Btn
          bgColor="#1e3799"
          textColor="white"
          btnLabel="Login"
          Press={() => props.navigation.navigate("loginScreen")}
        />
        <Btn
          bgColor="#ffa502"
          textColor="white"
          btnLabel="Signup"
          Press={() => props.navigation.navigate("signupScreen")}

          // Press={() => console.log("Hii")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    ...StyleSheet.absoluteFillObject, // Make the video fill the entire container
  },
  // Define any other styles here
});

export default Home;
