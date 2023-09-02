import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Modal from "react-native-modal";
import animalinfo from "../../screen/data/AnimalInfo";
import { Audio } from "expo-av";
// import Sound from 'react-native-sound';
//app.js

// import Sound from 'react-native-sound';
// import { Platform } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [selectedAnimal, setSelectedProduct] = useState(null);

  // const audioPath = Platform.select({
  //   ios: './assets/alert/audio1.mp3', // Path relative to the Xcode project
  //   android: './assets/alert/audio1.mp3', // Path relative to the Android project
  // });

  // const audioPath = './assets/alert/audio1.mp3';
  //   const alarmSound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('Failed to load the sound', error);
  //     }

  //     // For iOS, enable audio session
  //     if (Platform.OS === 'ios') {
  //       alarmSound.setCategory('Playback');
  //     }
  //   });

  // const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
  //   if (error) {
  //     console.log('Failed to load the sound', error);
  //     return;
  //   }
  // });

  const handleProductClick = async (item) => {
    setSelectedProduct(item);
    Vibration.vibrate(500); //vibration alert
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/alert/audio1.mp3")
      );

      await sound.playAsync();
    } catch (error) {
      console.log("Error playing audio: ", error);
    }
    // sound.play((success) => {
    //   if (success) {
    //     console.log('Sound played successfully');
    //   } else {
    //     console.log('Failed to play the sound');
    //   }
    // });
    // voice alert
    //   alarmSound.play((success) => {
    //   if (success) {
    //     console.log('Sound played successfully');
    //   } else {
    //     console.log('Sound playback failed');
    //   }
    // });
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductClick(item)}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Identified Animals</Text>
      <FlatList
        data={animalinfo}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal isVisible={selectedAnimal !== null}>
        <View style={styles.modalContent}>
          <Image
            source={require("../../assets/animal/Alert.jpg")}
            style={styles.modalImage}
          />
          <Text style={styles.notificationText}>Animal Detected</Text>
          <Text style={styles.selectedProductTitle}>
            {selectedAnimal?.title}
          </Text>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => {
              navigation.navigate("GuideLines", {
                itemNumber: selectedAnimal?.id,
              });
              handleModalClose();
            }}
          >
            <Text style={styles.viewDetailsButtonText}>View GuideLines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 45,
    backgroundColor: "rgba(0, 25, 0, 0.5)",
    alignItems: "center",
    marginBottom: 60,
  },
  heading: {
    fontSize: 24,
    paddingBottom: 15,
    fontFamily: "Sofia",
    color: "white",
  },
  productItem: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 200,

    marginBottom: 8,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    fontFamily: "Sofia",
    color: "white",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalImage: {
    width: "auto",
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
  },
  selectedProductTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
  },
  viewDetailsButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  viewDetailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default HomeScreen;
