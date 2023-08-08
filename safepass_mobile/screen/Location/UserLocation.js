import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as BackgroundFetch from 'expo-background-fetch';

const LOCATION_TRACKING = 'location-tracking';

var l1;
var l2;
var locations=[];

function UserLocation() {

    const [locationStarted, setLocationStarted] = React.useState(false);

    const startLocationTracking = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 15,
            distanceInterval: 0,
        });
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TRACKING
        );
        setLocationStarted(hasStarted);
        console.log('tracking started?', hasStarted);
    };

    React.useEffect(() => {
        const config = async () => {
            await Permissions.askAsync(Permissions.LOCATION_BACKGROUND),async()=>{
                let resf = await Location.requestForegroundPermissionsAsync();
                let resb = await Location.requestBackgroundPermissionsAsync();
                if (resf.status != 'granted' && resb.status !== 'granted') {
                    console.log('Permission to access location was denied');
                } else {
                    console.log('Permission to access location granted');
                }
            };
            
        };

        config();
    }, []);
    

    const startLocation = () => {
      
        startLocationTracking();
    }

    const stopLocation = () => {
        setLocationStarted(false);
        TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
            .then((tracking) => {
                if (tracking) {
                    Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
                }
            })
    }

    return (
        <View>
          {locationStarted ?
              <TouchableOpacity onPress={stopLocation}>
                  <Text style={styles.btnText}>Stop Tracking</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={startLocation}>
                  <Text style={styles.btnText}>Start Tracking</Text>
              </TouchableOpacity>
          }
        </View>
    );
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 20,
        backgroundColor: 'green',
        color: 'white',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) { 
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;

        l1 = lat;
        l2 = long;

        console.log(
            `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
        );
        
        const data = {
            lat,
            long,
          };
    }
});

const fetchLocationData=async()=>{

    const url = "http://192.168.1.6:8000/api/observationsforLocation";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if(response.status ===200){
            console.log("success");
            //console.log(response.observations[0].location.coordinates[0]);
            
            if(response.observations){
                console.log(response);
            }
          }
          else{
            console.log(response.status);
          }
          //console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export default UserLocation;