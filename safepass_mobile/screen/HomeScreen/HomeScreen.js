import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Background from "../background";
import Btn from "../btn";
import { darkGreen, green } from "../constants";

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <Text style={{ color: "white", fontSize: 64 }}>Safe</Text>
        <Text style={{ color: "white", fontSize: 64, marginBottom: 40 }}>
          Pass
        </Text>
        <Image
          style={{ width: 100, height: 100, alignSelf: "center" }}
          source={require("../../assets/safepass_logo.png")}
        />

        <Btn
          bgColor={green}
          textColor="white"
          btnLabel="Login"
          Press={() => props.navigation.navigate("loginScreen")}
        />
        <Btn
          bgColor="white"
          textColor={darkGreen}
          btnLabel="Signup"
          Press={() => props.navigation.navigate("signupScreen")}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default Home;
