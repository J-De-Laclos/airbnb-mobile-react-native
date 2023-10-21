import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (email && password) {
      if (setErrorMessage !== null) {
        setErrorMessage(null);
      }
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        // console.log(JSON.stringify(response.data, null, 2));
        if (response.data.token) {
          const token = response.data.token;
          setToken(token);
          setIsLoading(false);
          alert("You are connected");
        }
        // console.log(response.data);
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.status);
          setErrorMessage("email or password incorrect");
        } else {
          console.log(error.response.status);
          setErrorMessage("An error occured");
        }
        // console.log(error.response.data);
      }
    } else {
      setErrorMessage("Please fill all the fields");
    }
  };
  return !isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color="#EB5A62" />
    </View>
  ) : (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign In</Text>
      <CustomInput placeholder={"email"} value={email} setState={setEmail} />
      <CustomInput
        placeholder={"password"}
        value={password}
        setState={setPassword}
      />
      {errorMessage ? (
        <Text style={{ color: "#EB5A62" }}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity onPress={handleSignIn} style={styles.signInBtn}>
        <Text style={styles.signIn}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.textIn}>No account ? Register</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#717171",
    marginBottom: 90,
  },
  signIn: {
    color: "#717171",
    fontSize: 20,
  },
  signInBtn: {
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderColor: "#EB5A62",
    borderRadius: 25,
    marginBottom: 30,
    marginTop: 15,
  },
  textIn: {
    color: "#717171",
    marginBottom: 30,
  },
});
