import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native"; // Import the View, Text, TextInput, and StyleSheet components from React Native
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"; // Import the createUserWithEmailAndPassword and sendEmailVerification methods from the auth module
import { collection, addDoc } from "firebase/firestore"; // Import the collection and addDoc methods from the firestore module
import { auth, firestore } from "../firebaseConfig"; // Import the auth and firestore services from firebaseConfig.js

const Registration = ({ navigation }) => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registrationEmail,
        registrationPassword
      );

      // Check if userCredential exists and has the user property
      if (userCredential && userCredential.user) {
        // Save user information to Firestore
        await addDoc(collection(firestore, "users"), {
          uid: userCredential.user.uid,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: registrationEmail,
        });

        // Send email verification
        await sendEmailVerification(auth.currentUser);
        alert("A verification email has been sent to your account.");
      } else {
        alert("There was an issue with registration.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigation.navigate("UserLogin");
  };

  return (
    <ImageBackground
      source={require("../assets/chapterverse-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.header}>Registration Form</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={registrationEmail}
            onChangeText={setRegistrationEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={registrationPassword}
            onChangeText={setRegistrationPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Button title="Register" onPress={handleRegistration} />
          <Button title="Cancel" onPress={handleCancel} color="#ff6347" />
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
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
    textShadowRadius: 2, // Shadow blur radius
  },
});

export default Registration;
