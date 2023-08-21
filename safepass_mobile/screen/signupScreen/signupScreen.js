import React, { useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Background from "../background";
import Btn from "../btn";
import { darkGreen } from "../constants";
import Field from "../field";
import axios from "axios";
import { BASE_URL } from "@env";
import { Video } from "expo-av";

const SignupScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = values;

  const handleChange = (name) => (text) => {
    setValues({ ...values, [name]: text });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/signup`, {
        name,
        email,
        password,
      });
      console.log(data);

      if (data.success === true) {
        setValues({ name: "", email: "", password: "" });
        alert("Accoutn created");
        navigation.navigate("loginScreen");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Video
        source={require("../../assets/background.mp4")}
        style={styles.video}
        isMuted={true} // Use isMuted instead of muted
        shouldPlay
        isLooping
        resizeMode="cover"
      />
      <View style={{ alignItems: "center", width: 460 }}>
        <Text
          style={{
            color: "#B53471",
            fontSize: 70,
            fontFamily: "Sofia",
            marginTop: 80,
          }}
        >
          Safe Pass
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            fontFamily: "Sofia",
            marginTop: 20,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Create a new account
        </Text>
        <View
          style={{
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: "center",
          }}
        >
          <Field
            placeholder="Full Name"
            value={name}
            onChangeText={handleChange("name")}
          />
          <Field
            placeholder="Email"
            keyboardType={"email-address"}
            value={email}
            onChangeText={handleChange("email")}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={handleChange("password")}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "78%",
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>
              By signing in, you agree to our{" "}
            </Text>
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "78%",
              paddingRight: 16,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>and </Text>
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            // Press={() => {
            //   alert("Accoutn created");
            //   props.navigation.navigate("Login");
            // }}
            Press={handleSubmit}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Already have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("loginScreen")}
            >
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
export default SignupScreen;
