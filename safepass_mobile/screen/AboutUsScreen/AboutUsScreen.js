import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Video } from "expo-av";

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
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        This objective is specific, measurable, achievable, relevant, and
        time-bound. It is specific because it identifies the specific problem
        that needs to be solved (AVCs in Sri Lanka) and the specific solutions
        that will be implemented (identifying animal habitats and behaviors,
        developing wildlife detection systems, and improving driver education).
        It is measurable because it includes quantifiable metrics for success,
        such as the number of AVCs that are prevented. It is achievable because
        it is based on the existing knowledge and resources of the government
        and conservation organizations in Sri Lanka. It is relevant because it
        addresses a real and important problem that is affecting the people and
        wildlife of Sri Lanka. And it is time-bound because it specifies a
        deadline for achieving the objective. This objective is a good starting
        point for developing a comprehensive and integrated approach to reducing
        AVCs in Sri Lanka. By implementing the solutions outlined in this
        objective, the government and conservation organizations can make a real
        difference in the lives of the people and wildlife of Sri Lanka.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    padding: 16,
  },
  buttons: {
    margin: 16,
  },
});
