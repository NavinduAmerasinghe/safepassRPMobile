import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Platform,
  SafeAreaView,
} from "react-native";
//import Card
import { Card } from "react-native-elements";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import { BASE_URL } from "@env";
import { MyContext } from "../Context/MyContext";
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

const LOCATION_TRACKING = "location-trackingg";
var l1;
var l2;
var displayAnimalName = [];


const base_url = process.env.BASE_URL;

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    l1 = lat;
    l2 = long;
    console.log(base_url);
    // const result = await fetch(`${BASE_URL}/api/observationsforLocation`, {
    const result = await fetch(
      "http://192.168.1.6:8000/api/observationsforLocation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, long }),
      }
    );
    const resultData = await result.json();
    //console.log(resultData);

    if (resultData.data.newObservation.length > 0) {
      for (
        let index = 0;
        index < resultData.data.newObservation.length;
        index++
      ) {
        //console.log(resultData.status);
        if (resultData.status === "Warning") {
          eventEmitter.emit('updateContext', resultData.data.newObservation[index]);
          schedulePushNotification(
            resultData.data.newObservation[index].animalName
          );
          displayAnimalName.push(resultData.data.newObservation[index]);
        } else if (resultData.status === "Normal") {
          console.log(resultData.message);
        } else if (resultData.status === "error") {
          console.warn(resultData.message);
        }
      }
    }
    //console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }

  async function schedulePushNotification(animalName) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Location Detected Near You 📬",
        body: "Animal name : " + animalName,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function UserLocation() {
  const [locationStarted, setLocationStarted] = React.useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const {addDataItem} = useContext(MyContext)

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 30000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setLocationStarted(hasStarted);
    console.log("tracking started?", hasStarted);

    //get notification permission
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      console.log("Notification permission not granted.");
      //scheduleNotification()
    } else {
      console.log("Notification permission granted.");
    }
  };

  React.useEffect(() => {
    const config = async () => {
      let loc_back = await Permissions.askAsync(
        Permissions.LOCATION_BACKGROUND
      );
      if (loc_back.status != "granted") {
        console.log("Background location not granded");
      }
      await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

      let resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();
      if (resf.status != "granted" && resb.status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        {
          console.error("Notification not granded");
          return;
        }
      }
    };

    config();
  }, []);

  const startLocation = () => {
    startLocationTracking();
  };

  const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      }
    });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // Listen for the event and update the context when it's received
    const updateContextListener = eventEmitter.on('updateContext', (animalName) => {
      addDataItem(animalName)
    });

    return () => {
      // Remove the listener when the component unmounts
      updateContextListener.removeListener('updateContext');
    };
  }, []);

  return (
    <View>
      <Text style={{ color: "white", paddingTop: 10, paddingLeft: 30 }}>
        For your safe journey
      </Text>
      <View>
        {locationStarted ? (
          <TouchableOpacity onPress={stopLocation}>
            <Text style={styles.btnText}>Stop Tracking</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startLocation}>
            <Text style={styles.btnText}>Start Tracking</Text>
          </TouchableOpacity>
        )}
        {locationStarted && displayAnimalName.length > 0 && (
          <SafeAreaView style={cardStyle.container}>
            <View style={{ justifyContent: "flex-start" }}>
              {/* <View style={cardStyle.container}> */}
              <Card title="Local Modules">
                <Text>Animals which are closes to you</Text>
                {/*react-native-elements Card*/}
                <Text style={cardStyle.paragraph}>
                  {displayAnimalName[displayAnimalName.length - 1].animalName
                    ? displayAnimalName[displayAnimalName.length - 1]
                        .animalName +
                      " - " +
                      displayAnimalName[
                        displayAnimalName.length - 1
                      ].distance.toFixed(4) +
                      " kM"
                    : ""}
                </Text>
                <Text style={cardStyle.paragraph}>
                  {displayAnimalName[displayAnimalName.length - 2].animalName
                    ? displayAnimalName[displayAnimalName.length - 2]
                        .animalName +
                      " - " +
                      displayAnimalName[
                        displayAnimalName.length - 2
                      ].distance.toFixed(4) +
                      " kM"
                    : ""}
                </Text>
                <Text style={cardStyle.paragraph}>
                  {displayAnimalName[displayAnimalName.length - 3].animalName
                    ? displayAnimalName[displayAnimalName.length - 3]
                        .animalName +
                      " - " +
                      displayAnimalName[
                        displayAnimalName.length - 2
                      ].distance.toFixed(4) +
                      " kM"
                    : ""}
                </Text>
                <Text style={cardStyle.paragraph}>
                  {displayAnimalName[displayAnimalName.length - 4].animalName
                    ? displayAnimalName[displayAnimalName.length - 4]
                        .animalName +
                      " - " +
                      displayAnimalName[
                        displayAnimalName.length - 4
                      ].distance.toFixed(4) +
                      " kM"
                    : ""}
                </Text>
              </Card>
            </View>
          </SafeAreaView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    backgroundColor: "#2ecc71",
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});

const cardStyle = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    alignItems: "flex-start",
  },
  paragraph: {
    // margin: 24,
    // fontSize: 18,
    // fontWeight: "bold",
    // textAlign: "center",
    // color: "#34495e",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default UserLocation;
