import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function CustomInput({
  placeholder,
  value,
  setState,
  password,
}) {
  return (
    <TextInput
      secureTextEntry={password ? true : false}
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setState(text);
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#FFEAEC",
    borderBottomWidth: 2,
    width: "80%",
    height: 35,
    marginBottom: 35,
  },
});
