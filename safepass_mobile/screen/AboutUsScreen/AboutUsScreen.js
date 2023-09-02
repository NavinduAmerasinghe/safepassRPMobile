import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native"; // Import ScrollView
import { Video } from "expo-av";
import Background from "../background";
import FacebookIcon from "../../assets/facebook-icon.jpg";
import TwitterIcon from "../../assets/twitter-icon.jpg";
import InstagramIcon from "../../assets/instagram-icon.jpg";
import WhatsAppIcon from "../../assets/whatsapp-icon.jpg";

export const AboutUsScreen = (props) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require("../../assets/ProductionDemo.mp4")}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />

      <StatusBar style="auto" />

      <Text style={styles.title}>About Us 🤩</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          This objective is specific, measurable, achievable, relevant, and
          time-bound. It is specific because it identifies the specific problem
          that needs to be solved (AVCs in Sri Lanka) and the specific solutions
          that will be implemented (identifying animal habitats and behaviors,
          developing wildlife detection systems, and improving driver
          education). It is measurable because it includes quantifiable metrics
          for success, such as the number of AVCs that are prevented. It is
          achievable because it is based on the existing knowledge and resources
          of the government and conservation organizations in Sri Lanka. It is
          relevant because it addresses a real and important problem that is
          affecting the people and wildlife of Sri Lanka. And it is time-bound
          because it specifies a deadline for achieving the objective. This
          objective is a good starting point for developing a comprehensive and
          integrated approach to reducing AVCs in Sri Lanka. By implementing the
          solutions outlined in this objective, the government and conservation
          organizations can make a real difference in the lives of the people
          and wildlife of Sri Lanka.
        </Text>
      </ScrollView>
      <View style={styles.socialMediaIcons}>
        <Image source={FacebookIcon} style={styles.socialMediaIcon} />
        <Image source={TwitterIcon} style={styles.socialMediaIcon} />
        <Image source={InstagramIcon} style={styles.socialMediaIcon} />
        <Image source={WhatsAppIcon} style={styles.socialMediaIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 25, 0, 0.5)",
    padding: 10,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Sofia",
    color: "white",
  },
  description: {
    fontSize: 14,
    padding: 16,
    color: "white",
    textAlign: "justify",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  buttons: {
    margin: 16,
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 58,
  },
  socialMediaIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});
