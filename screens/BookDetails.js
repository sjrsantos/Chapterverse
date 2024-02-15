import React from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import booksData from "../components/books.json";

const BookDetails = ({ navigation, route }) => {
  const { bookId } = route.params;
  const book = booksData.books.find((book) => book.Id === bookId);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Book not found.</Text>
      </View>
    );
  }

  const {
    "Book Title": title,
    Category: category,
    Description: description,
    Rating: rating,
    "Image URL": imageUrl,
  } = book;

  return (
    <ImageBackground
      source={require("../assets/chapterverse-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.bookContainer}>
          <Image source={{ uri: imageUrl }} style={styles.bookImage} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.rating}>Rating: {rating}</Text>
        </View>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backButton: {
    padding: 10,
  },
  bookContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: "rgba(100,100, 100, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
  category: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
    color: "#02fa30",
    textShadowColor: "rgba(0,0, 0, 0.9)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
    textAlign: "justify",
    textShadowColor: "rgba(0,0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#02fa30",
    textShadowColor: "rgba(0,0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
});

export default BookDetails;
