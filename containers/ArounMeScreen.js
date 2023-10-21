import React from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function AroundMeScreen() {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          //   console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          const response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          console.log(response.data);
          setData(response.data);
          setisLoading(false);
        } else {
          const response = await axios.get(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
          );
          // console.log(response.data);
          setData(response.data);
          setisLoading(false);
        }
      } catch (error) {
        console.log("Une erreur s'est produite lors de la requête :", error);
      }
    };
    getPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      showsUserLocation={true}
      style={styles.map}
      initialRegion={{
        latitude: latitude ? latitude : 48.866667,
        longitude: longitude ? longitude : 2.333333,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((flat, index) => {
          return (
            <Marker
              onPress={() => {
                navigation.navigate("Room", {
                  id: flat._id,
                });
              }}
              key={flat._id}
              coordinate={{
                latitude: flat.location[1],
                longitude: flat.location[0],
              }}
            />
          );
        })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: "100%",
  },
});
