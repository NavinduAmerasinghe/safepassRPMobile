// import React, { useEffect, useState } from "react";
// import { View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

// const GeofenceMap = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [region, setRegion] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status != "granted") {
//         console.log("Locatio permission denied");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, logitude } = location.coords;
//       setCurrentLocation({ latitude, logitude });
//       setRegion({
//         latitude,
//         logitude,
//         latitudeDelta: 0.0922,
//         logitudeDelta: 0.0421,
//       });

//       //setup geofencing notifications with Enter and exit
//       Location.startGeofencingAsync("geofence", [
//         {
//           identifier: "YourGeofenceId",
//           latitude: latitude,
//           logitude: logitude,
//           radius: 100,
//           notifyOnEnter: true,
//           notifyOnExit: true,
//         },
//       ]);

//       Location.startGeofencingTaskAsync("geofenceTask", {
//         accuracy: Location.Accuracy.BestForNavigation,
//       });

//       Location.addGeofencingEventListener((event) => {
//         const { region, action } = event;
//         if (action === "enter") {
//           console.log("Entered geofence:", region.identifier);
//           // Implement your logic for ENTER notification
//         } else if (action === "exit") {
//           console.log("Exited geofence:", region.identifier);
//           // Implement your logic for EXIT notification
//         }
//       });
//     })();
//   }, []);
//   return (
//     <View style={{ flex: 1 }}>
//       {region && (
//         <MapView style={{ flex: 1 }} region={region} showsUserLocation={true}>
//           {currentLocation && (
//             <Marker coordinate={currentLocation} title="Current Location" />
//           )}
//         </MapView>
//       )}
//     </View>
//   );
// };

// export default GeofenceMap;
// import React, { useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

// export default function App() {
//   useEffect(() => {
//     // Request location permissions
//     const requestLocationPermission = async () => {
//       const { status } = await Permissions.askAsync(Permissions.LOCATION);

//       if (status === "granted") {
//         setupGeofence();
//         console.log("Location permissiongranted.");
//         let location = await Location.getCurrentPositionAsync({});
//         console.log("Location", location);
//       } else {
//         console.error("Location permission not granted.");
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   const setupGeofence = async () => {
//     // Set up a geofence around the coordinates (latitude: 37.7749, longitude: -122.4194) with a radius of 200 meters.
//     const region = {
//       latitude: 37.7749,
//       longitude: -122.4194,
//       radius: 200, // Radius in meters
//     };

//     // Subscribe to location updates to check if the device is inside the geofenced area.
//     Location.watchPositionAsync(
//       {
//         distanceInterval: 5, // Update location every 5 meters
//       },
//       async (location) => {
//         const isInsideGeofence = Location.GeofencingRegionContains(
//           region,
//           location.coords
//         );

//         if (isInsideGeofence) {
//           console.log("Device is inside the geofenced area.");
//           // Perform actions when the device is inside the geofenced area.
//         } else {
//           console.log("Device is outside the geofenced area.");
//           // Perform actions when the device is outside the geofenced area.
//         }
//       }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Geofence Example</Text>
//       <Text>Check the console for geofencing events.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
import React, { useEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [pin, setPin] = useState({
    latitude: 13.406,
    longitude: 123.3753,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("CurrentLocation", location);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.406,
          longitude: 123.3753,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0005,
        }}
      >
        <Marker
          coordinate={pin}
          title="Test Tiltle"
          description="Test Description"
          pinColor="gold"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag Start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag End", e.nativeEvent.coordinate);

            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}

          // image={require("./custom_pin.png")}
        >
          <Callout>
            <Text>This is a callout</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={100} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
