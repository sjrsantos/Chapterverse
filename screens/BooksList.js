import React from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import booksData from "../components/books.json";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const BooksList = ({ navigation }) => {
  const renderBookItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDetails", { bookId: item.Id })}
        style={styles.bookItem}
      >
        <Image source={{ uri: item["Image URL"] }} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{item["Book Title"]}</Text>
        <Text style={styles.bookCategory}>{item.Category}</Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally, navigate to the login screen or handle logged-out state
      navigation.navigate("UserLogin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/chapterverse-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Carousel
          data={booksData.books}
          renderItem={renderBookItem}
          sliderWidth={300}
          itemWidth={200}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bookItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  bookImage: {
    width: 200,
    height: 300,
    marginTop: "70%",
  },
  bookTitle: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
  bookCategory: {
    fontStyle: "italic",
    fontSize: 18,
    color: "#02fa30",
    textShadowColor: "rgba(0, 0, 0, 0.9)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 30,
    padding: 20, // Add padding for a larger touchable area
  },
  logoutButtonText: {
    fontSize: 18, // Increased font size
    color: "#fff", // White text color
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default BooksList;
