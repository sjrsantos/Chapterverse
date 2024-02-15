// UserLogin.js
import React, { useState } from "react"; // Import the useState hook from React
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native"; // Import the View, Text, TextInput, Button, Alert, and StyleSheet components from React Native
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signInWithEmailAndPassword method from the auth module
import { auth } from "../firebaseConfig"; // Import the auth service from firebaseConfig.js

const UserLogin = ({ navigation }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredentials) => {
        // The user is signed in
        // Navigate to the BooksList screen
        navigation.navigate("BooksList");
      })
      .catch((error) => {
        // Handle Errors here.
        Alert.alert("Login failed", error.message);
      });
  };

  const handleRegister = () => {
    // Navigate to the Registration screen
    navigation.navigate("Registration");
  };

  return (
    <ImageBackground
      source={require("../assets/chapterverse-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.welcome}>
          <Text style={styles.appName}>Chapterverse</Text>
        </Text>
        <Text style={styles.welcome}>Book App</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={loginEmail}
          onChangeText={setLoginEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={loginPassword}
          onChangeText={setLoginPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.registerPrompt}>Don't have an account?</Text>
        <Button title="Register" onPress={handleRegister} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  welcome: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
  appName: {
    fontWeight: "bold",
    fontSize: 30,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
  registerPrompt: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
});

export default UserLogin;
