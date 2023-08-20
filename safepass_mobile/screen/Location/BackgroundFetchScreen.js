import React,{useState,useRef,useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import * as Device from 'expo-device';

const BACKGROUND_FETCH_TASK = 'background-fetch';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

//   async function schedulePushNotification(animalName) {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "New Location Detected Near You 📬",
//         body: 'Animal name : '+animalName,
//         data: { data: 'goes here' },
//       },
//       trigger: { seconds: 2 },
//     });
//   }

//   const now = Date.now();

//   console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

//   try {
//     schedulePushNotification("Dog");
//     await Location.requestForegroundPermissionsAsync();
//     await Location.requestBackgroundPermissionsAsync();
//     const { coords } = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.Low,
//       enableHighAccuracy: false, // Add this option for better accuracy
//     });

//     if (coords) {
//       console.log(coords);
//       let lat = coords.latitude;
//       let long = coords.longitude;
//       console.log(lat, long);
//       return BackgroundFetch.BackgroundFetchResult.NewData;
//     } else {
//       return BackgroundFetch.BackgroundFetchResult.NoData;
//     }
//   } catch (error) {
//     console.log(error);
//     return BackgroundFetch.BackgroundFetchResult.Failed;
//   }
// });


async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}


async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  const config = async () => {
    try {
    let resf = await Location.requestForegroundPermissionsAsync();
    let resb = await Location.requestBackgroundPermissionsAsync();
    if (resf.status != 'granted' && resb.status !== 'granted') {
        console.log('Permission to access location was denied');
    } else {
        console.log('Permission to access location granted');
    }
    } catch (error) {
      console.error('Error in config:', error);
    }
    
};

  React.useEffect(() => {
    checkStatusAsync();
    config();
  }, []);

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{' '}
          <Text style={styles.boldText}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } catch (error) {
      console.error("Notification permission error:",error);
    }
    
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}