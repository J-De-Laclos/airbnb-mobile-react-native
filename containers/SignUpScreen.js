import {
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && userName && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email: email,
              username: userName,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          if (response.data.token) {
            setToken(response.data.token);
            alert("Compte créé");
          }
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Les passwords ne sont pas identiques");
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign Up</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      ></TextInput> */}
      <CustomInput placeholder={"email"} value={email} setState={setEmail} />
      <CustomInput
        placeholder={"username"}
        value={userName}
        setState={setUserName}
      />
      <TextInput
        style={styles.bigInput}
        multiline
        placeholder="Describe yourself in few words..."
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <CustomInput
        placeholder={"password"}
        value={password}
        setState={setPassword}
        password
      />
      <CustomInput
        placeholder={"confirmPassword"}
        value={confirmPassword}
        setState={setConfirmPassword}
        password
      />
      {error ? <Text style={{ color: "#EB5A62" }}>{error}</Text> : null}
      <TouchableOpacity style={styles.signUpBtn} onPress={handleSubmit}>
        <Text style={styles.signUp}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.textIn}>Already have an account? Sign In</Text>
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
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#717171",
    marginTop: 20,
    marginBottom: 30,
  },
  bigInput: {
    borderWidth: 2,
    borderColor: "#FFEAEC",
    width: "80%",
    height: 80,
    marginBottom: 35,
  },
  signUpBtn: {
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderColor: "#EB5A62",
    borderRadius: 25,
    marginBottom: 30,
    marginTop: 15,
  },
  signUp: {
    color: "#717171",
    fontSize: 20,
  },
  textIn: {
    color: "#717171",
    marginBottom: 30,
  },
});
