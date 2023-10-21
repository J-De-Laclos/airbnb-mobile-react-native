import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function RoomScreen({ route }) {
  //   console.log(route);
  const { id } = route.params;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<AntDesign key={i} name="star" size={24} color="orange" />);
      } else {
        tab.push(<AntDesign key={i} name="star" size={24} color="grey" />);
      }
    }
    return tab;
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imgBackground}
        source={{ uri: data.photos[0].url }}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomPart}>
        <View style={styles.partLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <View style={styles.starsContainer}>
            {displayStars(data.ratingValue)}
            <Text style={styles.reviews}>{data.reviews} reviews</Text>
          </View>
        </View>
        <View style={styles.partRight}>
          <Image
            style={styles.userImg}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        <Text
          numberOfLines={displayAllText === false ? 3 : null}
          style={styles.description}
        >
          {data.description}
        </Text>
        {displayAllText === false ? (
          <View style={styles.starsContainer}>
            <Text style={styles.show}>Show more</Text>
            <View style={styles.triangle}>
              <Entypo name="triangle-down" size={20} color="grey" />
            </View>
          </View>
        ) : (
          <View style={styles.starsContainer}>
            <Text style={styles.show}>Show less</Text>
            <View style={styles.triangle}>
              <Entypo name="triangle-up" size={20} color="grey" />
            </View>
          </View>
        )}
      </TouchableOpacity>
      <MapView
        style={styles.mapview}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    height: 250,
    width: "100%",
    objectFit: "cover",
    marginBottom: 20,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
  },
  priceContainer: {
    backgroundColor: "black",
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  starsContainer: {
    flexDirection: "row",
  },
  userImg: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  bottomPart: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  partLeft: {
    width: "80%",
  },
  partRight: {
    width: "20%",
  },
  reviews: {
    marginLeft: 10,
    marginTop: 5,
    color: "grey",
  },
  description: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  show: {
    paddingLeft: 10,
    marginTop: 8,
    color: "grey",
  },
  triangle: {
    marginTop: 8,
  },
  mapview: {
    height: 300,
    marginTop: 25,
    marginBottom: 30,
  },
  container: {
    backgroundColor: "white",
  },
});
