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

const Login = ({ navigation }) => {
  const [values, setValues] = useState({
    email: "dulnathamerasinghe@gmail.com",
    password: "Dulnath@123",
  });
  const [baseUrl, setBaseUrl] = useState(process.env.BASE_URL);
  const { email, password } = values;

  const handleChange = (email) => (text) => {
    setValues({ ...values, [email]: text });
  };

  // const handleSubmit = async () => {
  //   // e.preventDefault();
  //   try {
  //     const { data } = await axios.post("http://localhost:8000/api/signin", {
  //       email,
  //       password,
  //     });

  //     console.log(data);

  //     if (data === true) {
  //       setValues({ email: "", password: "" });
  //       alert("Logged In");
  //       navigation.navigate("HomeScreen");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // const handleSubmit = async () => {
  //   // e.preventDefault();
  //   try {
  //     const data = await axios.post("http://localhost:8000/api/signin", {
  //       email,
  //       password,
  //     });

  //     console.log(data);

  //     if (data === true) {
  //       setValues({ email: "", password: "" });
  //       alert("Logged In");
  //       navigation.navigate("HomeScreen");
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       const statusCode = error.response.status;
  //       if (statusCode === 401) {
  //         alert("Invalid email or password");
  //       } else {
  //         console.log(error.response.status);
  //       }
  //     } else {
  //       console.log(error.message);
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      // const url = `${BASE_URL}/api/signin`;
      // const url = "http://192.168.88.181:8000/api/signin";
      const url = "https://safe-pass.onrender.com/api/signin";
      const data = {
        email,
        password,
      };

      const response = await fetch("http://192.168.223.84:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setValues({ email: "", password: "" });
        alert("Logged In");
        navigation.navigate("TabNavScreen");
        //navigation.navigate("BackgroundFetchScreen")
      } else if (response.status === 401) {
        alert("Invalid email or password");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
      alert(error);
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
        <View
          style={{
            // backgroundColor: "rgba(255, 255, 255, 0.5)",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: darkGreen,
              fontWeight: "bold",

              paddingRight: "10px",
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            value={email}
            onChangeText={handleChange("email")}
            keyboardType={"email-address"}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={handleChange("password")}
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 32,
              marginBottom: 100,
            }}
          >
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Forgot Password ?
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            // Press={() => alert("Logged In")}
            Press={handleSubmit}
            style={{}}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("signupScreen")}
            >
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Signup
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

export default Login;
