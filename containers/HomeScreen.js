import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
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

  displayStars = (num) => {
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

  const navigation = useNavigation();
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => {
          item._id;
        }}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
              style={styles.separate}
            >
              <ImageBackground
                style={styles.imageBackground}
                source={{ uri: item.photos[0].url }}
              >
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
              </ImageBackground>
              <View style={styles.bottomPart}>
                <View style={styles.leftPart}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.starsContainer}>
                    {displayStars(item.ratingValue)}
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <View style={styles.rightPart}>
                  <Image
                    style={styles.userImage}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  imageBackground: {
    height: 200,
    objectFit: "cover",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  priceContainer: {
    height: 50,
    width: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 25,
    objectFit: "cover",
  },
  bottomPart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  leftPart: {
    width: "80%",
  },
  rightPart: {
    width: "20%",
    alignItems: "flex-end",
  },
  separate: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  reviews: {
    marginLeft: 10,
    marginTop: 5,
    color: "grey",
  },
});
